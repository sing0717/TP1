function Queue(){
    this.data = [];
    this.enqueue = function(node){
        this.data.push(node);
    }
    this.dequeue = function(){
        return this.data.shift();
    }
    this.isEmpty = function(){
        if(this.data.length == 0){
            return true;
        }
        return false;
    }
}