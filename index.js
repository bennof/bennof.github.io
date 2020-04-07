function Model(str,func) {
    this.str = str;
    this.func = func;
}



Array.prototype.calc = function(coln, func, length, offset) {
    if (length == undefined) length = this.length;
    if (offset == undefined) offset = 0;
    for(var i = offset; i < length; i++){
        this[i][coln] = func(i);
    }
};

Array.prototype.create_linear_model = function(coln, length, offset){
    var xm=0, ym=0, sx=0, sy=0, sxy=0, h;
    if (length == undefined) length = this.length;
    if (offset == undefined) offset = 0;
    for(var i = offset; i < length; i++){
        xm += i;
        sx += i*i;
        h = this[i][coln];
        ym += h;
        sy += h*h;
        sxy += h*i;
    }
    length -= offset;
    xm /= length;
    ym /= length;
    sx = sx/length-xm*xm;
    sy = sy/length-ym*ym;
    sxy = sxy/length-xm*ym;
    a=sxy/sx;
    b=ym-sxy/sx*xm;

    var r = new Model("f(x)="+a.toFixed(2)+"*x+"+b.toFixed(2),function(x) {return this.a*x+this.b;});
    r.a = a;
    r.b = b;
    return r;
};

Array.prototype.create_exp_model = function(coln, length, offset) {
    var i, h, hh, n;
    var xm=0.0, ym=0.0, sx=0.0, sy=0.0, sxy=0.0, sx2;
    if (length == undefined) length = this.length;
    if (offset == undefined) offset = 0;

    // calc cov, var and mean
    for( i = offset; i < length; i++){
        xm += i;
        sx += i*i;
        h = data[i][coln];
        h = (0.0==h)?0.0 : Math.log(h);
        ym += h;
        sy += h*h;
        sxy += h*i;
    }
    n = length - offset;
    xm /= n;
    ym /= n;
    sx2 = sx;
    sx = sx/n-xm*xm;
    sy = sy/n-ym*ym;
    sxy = sxy/n-xm*ym;
    a = sxy/sx;
    b = ym-sxy/sx*xm;
    

    //errors
    var err = 0.0, err0;
    for( i = offset; i < length; i++){
        h = data[i][coln];
        h = (0.0==h)?0.0 : Math.log(h);
        hh = b + i * a;
        h = (h - hh);
        err += h*h;
    }
    err = Math.sqrt(err/(n-2));
    console.log("Error: "+err);

    
    // apply exponential (Taylor series: e^x*delta x)
    a = Math.exp(a);
    b = Math.exp(b);

    var r = new Model("f(x)=("+b.toFixed(2)+")*("+a.toFixed(2)+")^x", function(x)  {return this.b*Math.pow(this.a,x);});
    r.a = a;
    r.b = b;
    r.err = err;
    r.get_sigma = function (n){
        var rr = new Model(n+" sigma", function(x){ return this.b*Math.pow(this.a,x)*(1 + this.err*this.n*Math.log(this.a)); });
        rr.a = this.a;
        rr.b = this.b;
        rr.n = n;
        rr.err = this.err;
        return rr;
    };
    return r;
};

Array.prototype.table = function(id, cols, length, offset){
    var i, j, tab = document.getElementById(id);
    if (length == undefined) length = this.length;
    if (offset == undefined) offset = 0;
    // reset table
    tab.rows = [];
    for (i = 0; i < cols.length; i++) {
        tab.insertRow(i);
        tab.rows[i].insertCell(0).innerHTML = (typeof cols[i] === 'string') ? cols[i] : cols[i].name;
    }

    for(i = offset; i < length; i++){
        for (j = 0; j < cols.length; j++) {
            tab.rows[j].insertCell(i+1).innerHTML = this[i][(typeof cols[j] === 'string') ? cols[j] : cols[j].col];
        }
    }
};

Array.prototype.plot = function(id, xlabels, ycols, models){
    var i, j, r, ctx = document.getElementById(id).getContext("2d");

    var labels = [];
    for(i=0; i<this.length; i++)
        labels.push(this[i][xlabels]);

    var plot = {
        labels: labels,
        datasets: []
    };

    for (i = 0; i < ycols.length; i++){
        r = {};
        if (typeof ycols[i] === 'string'){
            r.label = ycols[i];
            r.data = [];
            for(j=0; j<this.length; j++)
                r.data.push(data[i][ycols[i]]);
        }
        else {
            r.label = ycols[i].name;
            if (ycols[i].color) r.borderColor = ycols[i].color;
            if (ycols[i].type) r.type = ycols[i].type;
            r.data = [];
            for(j=0; j<this.length; j++)
                r.data.push(data[j][ycols[i].col]);
        }
        plot.datasets.push(r);
    }
    console.log(plot.datasets);

    for (i = 0; i < models.length; i++){
        r = {};
        r.label = (models[i].label)? models[i].label+" ("+ models[i].str +")" : models[i].str;
        if (models[i].color) r.borderColor = models[i].color;
        if (models[i].type) r.type = models[i].type;
        if (models[i].fill) r.fill = models[i].type; else r.fill = false;
        r.data = [];
        for(j=0; j<this.length; j++)
            r.data.push(models[i].func(j));
        plot.datasets.push(r);
    }

    var _myChart = new Chart(ctx,{
        type:'line',
        data: plot
    });
};