function ucFirst() {
    String.prototype.ucFirst = function () {
        return this.substr(0, 1).toUpperCase() + this.substr(1);
      };
}

export default {
    ucFirst
};