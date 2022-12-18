class LinearDifecit{
    constructor(){
        this.w = 95;
        this.j = 30;
        this.bmt = this.w - ((this.w*this.j)/100);
        this.m = 24;
        this.bov = this.bmt*this.m + ((this.w - this.bmt)*4.5)
        this.kfac = 1.5;
        this.dayNorm = (this.bov - 10) * this.kfac;
    }
    nutreins1(){
        const b1 = 1.5;
        const b2 = b1 * this.bmt;
        const bk = b2 * 4;
        const bp = (bk*100)/this.dayNorm;

        const j1 = 1;
        const j2 = j1 * this.bmt;
        const jk = j2 * 9;
        const jp = (jk*100)/this.dayNorm;

        const uk = this.dayNorm - (jk + bk);
        const u2 = uk / 4
        const u1 = u2 / this.bmt
        const up = (uk * 100) / this.bmt
        return {
            b: { w: b1, dw: b2, k: bk, p: bp },
            j: { w: j1, dw: j2, k: jk, p: jp },
            u: { w: u1, dw: u2, k: uk, p: up },
        }
    }
    deficed(){
        const k = 500;
        return {
            k: this.dayNorm - k,
            p: (k*100)/this.dayNorm
        }
    }
    nutreins2(){
        const b1 = 2;
        const b2 = b1 * this.bmt;
        const bk = b2 * 4;
        const bp = (bk*100)/this.dayNorm;

        const j1 = 0.8;
        const j2 = j1 * this.bmt;
        const jk = j2 * 9;
        const jp = (jk*100)/this.dayNorm;

        const uk = this.deficed().k - (jk + bk);
        const u2 = uk / 4;
        const u1 = u2 / this.bmt
        const up = (uk * 100) / this.deficed().k

        return {
            b: { w: b1, dw: b2, k: bk, p: bp },
            j: { w: j1, dw: j2, k: jk, p: jp },
            u: { w: u1, dw: u2, k: uk, p: up },
        }
    }
    dayCalory(b, j, u){
        return ((b+u)*4)+j*9;
    }
    result(){
        const nk = this.dayNorm * 10;
        const fk = this.dayCalory( this.nutreins2().b.dw, 
            this.nutreins2().j.dw, 
            this.nutreins2().u.dw) * 10;
        const dk = nk - fk;
        return {
            nk, 
            fk,
            dk,
            sj: dk/7.7, 
        }
    }
}

class BUCHlite extends LinearDifecit{
    constructor(){
        super();
        this.dayfilter = {
            nontraining: { b: 2.2, j: 1, u: 2.5 },
            training: { b: 1.8, j: 0.8, u: 5 },
            sunday: { b: 1.2, j: 0.5, u: 7.5 },
        }
    }
    days(){
        const days_arr = [
            { title: 'Понедельник', value: 'training' },
            { title: 'Вторник', value: 'nontraining' },
            { title: 'Среда', value: 'training' },
            { title: 'Четверг', value: 'nontraining' },
            { title: 'Пятница', value: 'training' },
            { title: 'Суббота', value: 'nontraining' },
            { title: 'Воскресенье', value: 'sunday' },
            { title: 'Понедельник', value: 'training' },
            { title: 'Вторник', value: 'nontraining' },
            { title: 'Среда', value: 'training' },
        ]
        return days_arr.map(day => {
            const b = this.bmt * this.dayfilter[day.value].b;
            const j = this.bmt * this.dayfilter[day.value].j;
            const u = this.bmt * this.dayfilter[day.value].u;
            const k = ((b+u)*4) + j*9;
            return { ...day, b, j, u, k}
        })
    }
    sumDaysCalory(){
        return this.days().reduce((sum, day) => {
            const b = this.bmt * this.dayfilter[day.value].b;
            const j = this.bmt * this.dayfilter[day.value].j;
            const u = this.bmt * this.dayfilter[day.value].u;
            const k = ((b+u)*4) + j*9;
            // const data = { ...day, b, j, u, k};
            return k + sum
        }, 0)
    }
    result(){
        const nk = this.dayNorm * 10;
        const fk = this.sumDaysCalory();
        const dk = nk - fk;
        return {
            nk, 
            fk,
            dk,
            sj: dk/7.7, 
        }
    }
}

class SuperBUCH extends LinearDifecit{
    constructor(){
        super();
        this.dayfilter = {
            high: { b: 2.5, j: 1, u: 2 },
            load: { b: 1.5, j: 0.5, u: 7.5 },
        }
    }
    days(){
        const days_arr = [
            { title: 'Понедельник', value: 'high' },
            { title: 'Вторник', value: 'high' },
            { title: 'Среда', value: 'high' },
            { title: 'Четверг', value: 'load' },
            { title: 'Пятница', value: 'high' },
            { title: 'Суббота', value: 'high' },
            { title: 'Воскресенье', value: 'load' },
            { title: 'Понедельник', value: 'high' },
            { title: 'Вторник', value: 'high' },
            { title: 'Среда', value: 'high' },
        ]
        return days_arr.map(day => {
            const b = this.bmt * this.dayfilter[day.value].b;
            const j = this.bmt * this.dayfilter[day.value].j;
            const u = this.bmt * this.dayfilter[day.value].u;
            const k = ((b+u)*4) + j*9;
            return { ...day, b, j, u, k}
        })
    }
    sumDaysCalory(){
        return this.days().reduce((sum, day) => {
            const b = this.bmt * this.dayfilter[day.value].b;
            const j = this.bmt * this.dayfilter[day.value].j;
            const u = this.bmt * this.dayfilter[day.value].u;
            const k = ((b+u)*4) + j*9;
            // const data = { ...day, b, j, u, k};
            return k + sum
        }, 0)
    }
    result(){
        const nk = this.dayNorm * 10;
        const fk = this.sumDaysCalory();
        const dk = nk - fk;
        return {
            nk, 
            fk,
            dk,
            sj: dk/7.7, 
        }
    }
}


class JIR{
    constructor(){
        this.w = 90;
        this.k = 35;
        this.daynorm = this.w * this.k;
        this.cdef = 650;
        this.defnorm = this.daynorm - this.cdef;
        this.j10day = (this.cdef*10)/7.7;
        this.bju_1 = { b:2.2, j: 0.8, u: null };
    }
    dayNormBJU(){
        const b = this.w * this.bju_1.b;
        const j = this.w * this.bju_1.j;
        const u = (this.defnorm - ((b*4) + (j*9)))/ 4;
        this.bju_1.u = u / this.w;
        return { b, j, u }
    }
    caloryBJU(){
        const b = this.dayNormBJU().b * 4;
        const j = this.dayNormBJU().j * 9;
        const u = this.dayNormBJU().u * 4;
        return { b, j, u, s: b+j+u }
    }
}

const o = new JIR()

console.table(o.caloryBJU());
