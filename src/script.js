const buildTable = (data) => {
    alert(JSON.parse);
    var table = document.getElementById('myTable')
    
    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].firstname}</td>
                        <td>${data[i].age}</td>
                        <td>${data[i].email}</td>
                </tr>`
        table.innerHTML += row


    }
}
module.exports = buildTable;