class Visitor {
  constructor({ identifier, uuid }) {
    this.identifier = identifier
    this.uuid = uuid
  }

  isEmpty = () => !this.isPresent()

  isPresent = () => this.identifier || this.uuid
}

export default Visitor
