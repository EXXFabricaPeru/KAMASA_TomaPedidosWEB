using DBCAccesoDatos;
using DTOEntidades;
using System.Collections.Generic;

namespace BOCNegocio
{
    public interface IBOCArticulo
    {
        DTORespuestaArticulo fn_Articulo_Listar(string valor, string almacen, string listprice, string moneda, string flagStock, csCompany xCompany);
        DTORespuestaArticulo fn_ObtenerPrecio(string listPrice, string moneda, string undMed, string codigoArt, csCompany xCompany);
        DTORespuestaArticulo fn_ObtenerStockUndMed(string almacen, string undMed, string codigoArt, csCompany xCompany);
        DTORespuestaArticulo fn_StockAlmacen(string codigoArt, string undMed, csCompany xCompany);
    }

    public class BOCArticulo:IBOCArticulo
    {

        public DTORespuestaArticulo fn_Articulo_Listar(string valor, string almacen, string listprice, string moneda, string flagStock, csCompany xCompany)
        {
            IDBCArticulo oDbArticulo = new DBCArticulo();
            return oDbArticulo.fn_Articulo_Listar(valor, almacen, listprice, moneda, flagStock, xCompany);
        }
        public DTORespuestaArticulo fn_ObtenerPrecio(string listPrice, string moneda, string undMed, string codigoArt, csCompany xCompany)
        {
            IDBCArticulo oDbArticulo = new DBCArticulo();
            return oDbArticulo.fn_ObtenerPrecio(listPrice, moneda, undMed, codigoArt, xCompany);
        }
        public DTORespuestaArticulo fn_ObtenerStockUndMed(string almacen, string undMed, string codigoArt, csCompany xCompany)
        {
            IDBCArticulo oDbArticulo = new DBCArticulo();
            return oDbArticulo.fn_ObtenerStockUndMed(almacen, undMed, codigoArt, xCompany);
        }
        public DTORespuestaArticulo fn_StockAlmacen(string codigoArt, string undMed, csCompany xCompany)
        {
            IDBCArticulo oDbArticulo = new DBCArticulo();
            return oDbArticulo.fn_StockAlmacen(codigoArt, undMed, xCompany);
        }
    }
}
