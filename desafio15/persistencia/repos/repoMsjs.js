const daoMsjsFactory = require("../dao/daoFactoryMsjs")

class repoMsjs{
    constructor(){
        this.dao = daoMsjsFactory.getDao()
    }

    async save (obj){
        await this.dao.save(obj)
    }

    async getAll (){
        const final = await this.dao.getAll()
        return final
    }
}

module.exports= repoMsjs;