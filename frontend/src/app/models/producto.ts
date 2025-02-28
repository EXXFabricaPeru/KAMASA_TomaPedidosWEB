export interface Producto {
    codArticulo: string;
    descripcion: string;
    codAlmacen: string;
    cantActual: Number;
    cantSolicitada: Number;
    precioUnit: Number;
    stockDisponible: Number;
    codUndMed: Number;
    unidadMedida: string;
    centroCosto: string;
}