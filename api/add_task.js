exports.addTask = ({
  id, name, status, created,
}) => {
//    console.log('It Is From addTask')
//    console.log(id,name, status, created)
  const newTask = {
    id,
    name,
    status,
    created,
  };
  return newTask;
};
