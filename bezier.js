var Vector2 = function(x, y){
    this.x = x;
    this.y = y;
}

Vector2.prototype = {
    // multiply by a scalar or another vector. returns a new vector
    multiply : function(s){
        var newVec = this.clone();
        if(typeof s === "object"){
            

            if(s.x == null || s.y == null){
                console.warn("arg this shouldn't happen");
                return;
            }
            newVec.x *= s.x;
            newVec.y *= s.y;
            return newVec;
        }

        newVec.x *= s;
        newVec.y *= s;
        return newVec;
    },
    clone : function(){
        return new Vector2(this.x, this.y);
    },

    // add a scalar
    add : function(s) {
        var newVec = this.clone();
        if(typeof s === "object"){
            if(s.x == null || s.y == null){
                console.warn("arg this shouldn't happen");
                return;
            }
            newVec.x += s.x;
            newVec.y += s.y;
            return newVec;
        }
        newVec.x += s;
        newVec.y += s;
        return newVec;
    },
    multiply2 : function(){

    },
    create : function(x, y){
        return new Vector2(x, y);
    }
};

function CalcBezierPoint(t, p0, p1, p2, p3) {
    var u = 1 - t;
    var tt = t * t;
    var uu = u * u;
    var uuu = uu * u;
    var ttt = tt * t;


    var p = new Vector2(p0.x, p0.y);
    p = p.multiply(uuu);
    p = p.add(p1.multiply(3 * uu * t));
    p = p.add(p2.multiply(3 * u * tt));
    p = p.add(p3.multiply(ttt));

    return p;
}

function ff(){

    var v1 = new Vector2(1, 1);

    var v2 = new Vector2(2, 2);

    var v3 = new Vector2(3, 3);
    var v4 = new Vector2(4, 4);

    return CalcBezierPoint(0.5, v1, v2, v3, v4);
}