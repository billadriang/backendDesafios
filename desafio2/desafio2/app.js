import { Contenedor } from "./modules/Contenedor.js";

const archivo = new Contenedor("productos.txt");
const primero = {
    title: "paracetamol",
    price: 100,
    thumbnail: "https://www.laboratoriochile.cl/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2015/11/Paracetamol_500MG_16C_BE_HD.jpg.webp"
};
const segundo = {
    title: "ibuprofeno",
    price: 200,
    thumbnail: "https://www.laboratoriochile.cl/wp-content/uploads/2019/03/Ibuprofeno_600MG_20C_BE_HD.jpg"
};
const tercero = {
    title: "metformina",
    price: 300,
    thumbnail: "https://cdn.shopify.com/s/files/1/0024/6058/1940/products/metformina-850-mg-be-x-60-comprimidos-laboratorio-chile-158069.jpg?v=1656619036"
}
// Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído. 

const principal = async () => {
    await archivo.archivoDisponible();
    await archivo.save(primero);
    await archivo.save(segundo);
    await archivo.save(tercero);
    console.log(await archivo.obtenTodos());
    console.log(await archivo.obtenPorId(1));
    await archivo.borraPorId(1);
    console.log(await archivo.obtenTodos());
    await archivo.borrarTodo();
};
principal();