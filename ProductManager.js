const fs=require('fs');

class ProductManager{
    
    constructor(path){
        this.products=[];
        this.path=path;
    }

    addProduct(title,description,price,thumbnail,code,stock){ 


        let newCode = this.products.find((prod) => prod.code === code); //primera validación por código
        if(newCode){
            console.log(`Ya existe un producto con el código ${code}`);
            return;
        }

        if(!title || !description || !price || !thumbnail || !code ||!stock ){//segunda validación por si hay algún dato mal ingresado
            console.error("Alguno de sus datos es incorrecto");
           
        }
        else{

            let newProduct={
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            if(this.products.length===0){
                newProduct.id=1;
            }else{
                newProduct.id=this.products[this.products.length -1].id + 1;    
            }

            this.products.push(newProduct);
            fs.writeFileSync(this.path,JSON.stringify(this.products));
            
    }
        
        
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        
        let productFind= this.products.find((product) => product.id === id);

        if(!productFind){
            console.error(`No se encontró ningún producto con el id ${id}`);
            return;
        }

            return productFind;
        
        
        
    }

    setProduct(id){

    }

    removeProduct(){

    }
}

let pm=new ProductManager('./archivos/archivoProductos.txt');

pm.addProduct("queso1","jdakks  sfkgdm dk", 2300, "http://jkjnskdc.ad", "QH4562",200);
pm.addProduct("fiambre2","jdakks gdh  sfkgdm dk", 2700, "http://jkjnskdfsc.ad", "FF4562", 150);
pm.addProduct("fiambre3","jdakks gdh  sfkgdm dk", 2700, "http://jkjnskdfsc.ad", "FF456", 150);

console.log(pm.getProducts());
console.log("----------------");
console.log(pm.getProductById(2));
console.log(pm.getProductById(8));
