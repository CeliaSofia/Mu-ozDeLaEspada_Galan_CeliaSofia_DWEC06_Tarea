// Category → estructura de categorías del almacén
class Category{
    #title;
    #descriptionCategory;
    // CONSTRUCTOR
    constructor(title, descriptionCategory){
        this.#title = title;
        this.#descriptionCategory = descriptionCategory;
    }
    // GETTERS Y SETTERS
    get getTitle(){
        return this.#title;
    }
    set setTitle(title){
        if (title !=""){
            this.#title = title;
        }
        else{
            console.log('Excepción → El nombre está vacío')
        }
    }
    get getDescriptionCategory(){
        return this.#descriptionCategory;
    }
    set setDescriptionCategory(descriptionCategory){
        this.#descriptionCategory = descriptionCategory;
    }
}