const array = [[1, 1, 1], [2, 2, 2], [3, 3, 3]]

function otherFunc() {
    console.log('before')
    array.forEach(element => {
      element.forEach(i => {
        console.log(i)
      })
    })    
    if(newFunc){
        return
    }
    console.log('after');
}

function newFunc(){
    return false
}

otherFunc()