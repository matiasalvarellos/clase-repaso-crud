const fs = require("fs");
const path = require("path");

const productsJson = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
const products = JSON.parse(productsJson);

function writeFileJson(data){
    const dataString = JSON.stringify(data);
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), dataString );
}

const productController = {
    list: function(req, res){
        console.log(products);
        res.render('menu-products', { products: products });
    },
    detail: function(req, res){
        const productId = req.params.id;
        //buscamos el producto
        const productFound = products.find(function(product){
            return product.id == productId;
        })
        //renderizamos vista de detalle
        res.render("product-detail", { product: productFound })

    },
    create: function(req, res){
        res.render('product-create-form');
    },
    processCreate: function(req, res){
        console.log(req.body);
        //creo el nuevo producto
        const newProduct = {
            id: products.length + 1 ,
            name: req.body.name ,
            description: req.body.description ,
            price: req.body.price ,
        }
        //actualizo products
        products.push(newProduct);

        //Sobreescribo el archivo json (mi DB) con todos los datos actualizados
        writeFileJson(products)
        
        res.redirect("/products/list");

    },
    edit: function(req, res){
        
        const productId = req.params.id;
        //busco el producto
        const productFound = products.find(function(product){
            return product.id == productId;
        })
        //respondo con una vista con la inform del producto a actualizar
        res.render("product-update-form", { product: productFound });
    }, 
    update: function(req, res){
        const productId = req.params.id;

        //obtengo el producto
        const productFound = products.find(function(product){
            return product.id == productId;
        })

        //actualizo el producto
        productFound.name = req.body.name;
        productFound.description = req.body.description;
        productFound.price = req.body.price;

        //actualizo archivo json (DB)
        writeFileJson(products);

        res.redirect("/products/list");

    },
    destroy: function(req, res){
        const productId = req.params.id;

        //obtengo el indice del producto 
        const productIndexFound = products.findIndex(function(product){
            return product.id == productId;
        })

        // array = ['hola', 'chau' , 'como va?' ]
        // array.splice(1, 1 )
        // array = ['hola', 'como va?']
        products.splice(productIndexFound, 1)

        //actualizo archivo json (DB)
        writeFileJson(products);

        res.redirect("/products/list");
    }
}

module.exports = productController;