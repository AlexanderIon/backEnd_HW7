export default class TicketFull {
    constructor(name, discription, status){
        this.id = (+new Date).toString(16)
        this.created = Date.now()
        this.name = name
        this.status = status
        this.description = discription
    }
    

}