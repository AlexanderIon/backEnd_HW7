
exports.addTask = ({id, name, status, created}) => {
//    console.log('It Is From addTask') 
//    console.log(id,name, status, created)
   const newTask = {id: id,
           name: name,
           status: status,
           created: created }
    return newTask       
}
