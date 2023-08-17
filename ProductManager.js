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
        let fileProducts = fs.readFileSync(this.path,'utf-8')
        return console.log(fileProducts);
    }

    getProductById(id){
        
        let productFind= this.products.find((product) => product.id === id);

        if(!productFind){
            console.error(`No se encontró ningún producto con el id ${id}`);
            return;
        }

            return productFind;
        
        
        
    }

    upDateProduct(id,field,value){
        const productToUpdate = this.products.find(product => product.id === id);

        if(!productToUpdate){
            return console.log(`El campo ${field} no existe`);
        } 

        productToUpdate[field] = value; 
        fs.writeFileSync(this.path,JSON.stringify(this.products));
        return console.log(`El campo ${field} del producto con id ${id} fue cambiado a ${value}`);

    }

    removeProduct(id){
        let productToRemove = this.products.findIndex(prod => prod.id===id);
        
         
        if (productToRemove=== -1){
            console.log(`El producto con id ${id} no existe`); 
            return;
        } 

        this.products.splice(productToRemove,1);
        console.log(`El producto con id ${id} fue eliminado`); 
        fs.writeFileSync(this.path,JSON.stringify(this.products));
    }
}

let pm=new ProductManager('./archivos/archivoProductos.txt');

pm.addProduct("queso1","jdakks  sfkgdm dk", 2300, "http://jkjnskdc.ad", "QH4562",200);
pm.addProduct("fiambre2","jdakks gdh  sfkgdm dk", 2700, "http://jkjnskdfsc.ad", "FF4562", 150);
pm.addProduct("fiambre3","jdakks gdh  sfkgdm dk", 2700, "http://jkjnskdfsc.ad", "FF456", 150);

pm.getProducts();
console.log("----------------");
console.log(pm.getProductById(2));
console.log(pm.getProductById(8));

pm.upDateProduct(2, 'title', 'title cambiado');
pm.removeProduct(1);
pm.getProductById(2);
pm.getProducts();
