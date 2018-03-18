class Statistic{
    constructor(){
        this._logs = [];

        this.set = this.set.bind(this);
        this.get = this.get.bind(this);
    }

    set(message, success){
        this._logs.push({
            success,
            message,
            timestamp: Date.now(),
        });
    }

    get(){
        return {
            logs: this._logs
        }
    }
}

const stat = new Statistic();

module.exports = {
    set: stat.set,
    get: stat.get,
};