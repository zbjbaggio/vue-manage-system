export function errorfun() {
    console.log("---------------")
    return true
}
Array.prototype.remove = function(val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}
