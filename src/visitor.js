class Visitor {
  constructor(identifier) {
    this.identifier = identifier
  }

  isEmpty = () => !this.identifier
}

export default Visitor
