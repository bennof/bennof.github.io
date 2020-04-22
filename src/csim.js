
function rand(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max));
}

function erf(x) { // Abramowitz and Stegun
    var z, sign, h, h1, h2;
    const ERF_A = 0.147; 
    if(0==x) {
        sign = 0;
        return 0;
    } else if(x>0){
        sign = 1;
    } else {
        sign = -1;
    }

    h1 = 1 + ERF_A * x * x;
    h2 = 4/Math.PI + ERF_A * x * x;
    h = h2 / h1;
    h *= x * -x;
    return Math.sqrt(1-Math.exp(h))*sign;
}

export class csim {
    constructor(Size){
        this.step = 0;
        this.n = Size;
        this.cfg = {
            start_i: 3, // infections at start
            ifr: 0.01, // infection fatility rate modifier
            ir: 0.01, // infection rate modifier
            sc: 4, // social contact modifier
            cr: 0.15 // case rate modifier
        };
        
        // record simulation data
        this.record = {
            deceased:     [],
            recovered:    [],
            positive:     [],
            unidentified: [],
            urecovered:   [],
            history:      []
        };
    }

    get_config() {
        return this.cfg;
    }
    set_config(Config) {
        this.cfg = Config;
    }

    get_state() {
        return this.record;
    }

    // run multiple steps
    run(Frames) {
        var i;
        for(i=0;i<Frames;i++){
            this.step();
        }
    }

    // first step
    init() {
        var i,p;
        // actor data
        // age, health, social radius, 
        this.person = new Float32Array(this.n*3);
        // 0, -1 recovered, -2 deceased, >0 days of infection
        this.person_state = new Int32Array(this.n);

        for (i=0; i<this.n*3;i++){
            this.person[i] = math.random();
        }
        for (i=0; i<this.start_i;i++){
            p = rand(this.size);
            while (this.person_state[p]!=0)
                p = rand(this.size);
            this.person_state[p] = 1;
        }
        this.record.deceased.push(0);
        this.record.recovered.push(0);
        this.record.positive.push(0);
        this.record.unidentified.push(this.start_i);
    }

    // perform a single step
    step() {
        this.step++;
        var i;
        // update 
        for(i=0;i<this.n;i++){
            if(this.person_state < 0)
                continue;
            else if (this.person_state == 0){

            } else if (this.person_state > 100){
                this.person_state++;
            } else if (this.person_state > 0){
                this.person_state++;
            }

        }
        // calculate info
        for(i=0;i<this.n;i++){
            var d=0,r=0,p=0,u=0,ur;
            if ( this.person_state == -2 )
                d++; // deceased
            else if ( this.person_state == -3 )
                ur++; // immune/recovered but unidentified
            else if ( this.person_state == -1 )
                r++; // immune/recovered
            else if ( this.person_state > 100 )
                p++; // positiv
            else if ( this.person_state > 0 )
                u++; // unidentified
        }
        this.record.deceased.push(d);
        this.record.recovered.push(r);
        this.record.urecovered.push(ur);
        this.record.positive.push(p);
        this.record.unidentified.push(u);
    }
};