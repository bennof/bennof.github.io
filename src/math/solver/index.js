

class NewtonSolver{
    constructor(df){
        this.df = df;
    }

    run(X0,n) {
        var len = X0.length,
            data = new Array();
        data[0]=X0;

        for(var i=1; i<n; i++){
            var d = new Array(len);
            for(var j=0; j<len; j++){
                d[j] = data[i-1][j]+this.df[j].call(this,data[i-1]);
            }
            data.push(d);
        }

        return data;
    }
}