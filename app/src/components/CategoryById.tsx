
const mockCategoryList =[{
    id: "KTKBU98SFRHK2KSO0YETA52A",
    name: "Útraza za jídlo"
    
},{
    id: "MWB39PM68U8CHAW2315LQVGP",
    name: "Útraza za nájem"
    
}]

const CategoryById = (id:string) => {
let category = mockCategoryList.find(item=>item.id===id)
    return category?.name||"Category not found"
}

export default CategoryById