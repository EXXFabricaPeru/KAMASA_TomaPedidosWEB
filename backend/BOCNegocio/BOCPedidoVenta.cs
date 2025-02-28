using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DTOEntidades;
using DBCAccesoDatos;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Configuration;

namespace BOCNegocio
{
    public interface IBOCPedidoVenta
    {
        DTORespuestaPedido fn_PedidoVenta_Listar(string CodVendedor, string FecIni, string FecFin, string Tipo, string cliente, string Estado, csCompany xCompany);
        DTORespuestaPedido fn_TrackingPedidoVenta_Listar(string FecIni, string FecFin, string CodVendedor, string CodCliente, csCompany xCompany);
        DTORespuestaPedido fn_PedidoVenta_Duplicar(string pNro, string pTipo, csCompany xCompany);
        DTORespuesta fn_PedidoVentaRegistrar(DTOPedidoVentaCab Pedido, csCompany xCompany);
        DTORespuesta fn_PedidoVentaEditar(DTOPedidoVentaCab Pedido, csCompany xCompany);
        DTORespuesta fn_CopyToOrder(DTOPedidoVentaCab pDocumento, csCompany xCompany);
        DTORespuestaPedido fn_ObtenerPromocion(DTOPedidoVentaCab pedido, csCompany xCompany);
        List<DTOPromocion> fn_BoniSugeridad_Buscar(string numeroOperacion, string usuario, csCompany xCompany);
    }

    public class BOCPedidoVenta : IBOCPedidoVenta
    {
        #region Metodos No Transaccionales
        public DTORespuestaPedido fn_PedidoVenta_Listar(string CodVendedor, string FecIni, string FecFin, string Tipo, string cliente, string Estado, csCompany xCompany)
        {
            DTORespuestaPedido oLista = new DTORespuestaPedido();
            IDBCPedidoVenta dbcPedido = new DBCPedidoVenta();
            try
            {
                oLista = dbcPedido.fn_PedidoVenta_Listar(CodVendedor, FecIni, FecFin, Tipo, cliente, Estado, xCompany);
            }
            catch (Exception ex)
            {
                BOCErrorControl.RegistraError(ex.Message);
            }
            
            return oLista;
        }

        public DTORespuestaPedido fn_TrackingPedidoVenta_Listar(string FecIni, string FecFin, string CodVendedor, string CodCliente, csCompany xCompany)
        {
            DTORespuestaPedido oLista = new DTORespuestaPedido();
            IDBCPedidoVenta dbcPedido = new DBCPedidoVenta();
            try
            {
                oLista = dbcPedido.fn_TrackingPedidoVenta_Listar(FecIni, FecFin, CodVendedor, CodCliente, xCompany);
            }
            catch (Exception ex)
            {
                BOCErrorControl.RegistraError(ex.Message);
            }
            
            return oLista;
        }

        public DTORespuestaPedido fn_PedidoVenta_Duplicar(string pNro, string pTipo, csCompany xCompany)
        {
            DTORespuestaPedido oLista = new DTORespuestaPedido();
            IDBCPedidoVenta dbcPedido = new DBCPedidoVenta();
            try
            {
                oLista = dbcPedido.fn_PedidoVenta_Duplicar(pNro, pTipo, xCompany);
            }
            catch (Exception ex)
            {
                BOCErrorControl.RegistraError(ex.Message);
            }

            return oLista;
        }
        #endregion

        #region Metodos Transaccionales
        public DTORespuesta fn_PedidoVentaRegistrar(DTOPedidoVentaCab Pedido, csCompany xCompany)
        {
            DTORespuesta dto = new DTORespuesta();
            IDBCPedidoVenta dbcPedido = new DBCPedidoVenta();

            string _xResult;

            try
            {
                _xResult = dbcPedido.fn_PedidoVentaRegistrar(Pedido, xCompany);

                //DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(DTOPedidoVentaCab));
                //MemoryStream mem = new MemoryStream();
                //ser.WriteObject(mem, Pedido);

                //string data = Encoding.UTF8.GetString(mem.ToArray(), 0, (int)mem.Length);
                //data += "-->" + _xResult;
                //BOCErrorControl.RegistrarJson(data);

                if (!_xResult.Contains('-'))
                {
                    dto.Estado = false;
                    dto.Mensaje = _xResult;
                }
                else
                {
                    string[] xValor = _xResult.Split('-');

                    dto.Estado = true;
                    dto.Mensaje = xValor[0];
                    dto.key = xValor[1];
                }
            }
            catch (Exception ex)
            {
                dto.Estado = false;
                dto.Mensaje = "Se produjo un error: " + ex.Message;
                //BOCErrorControl.RegistraError(dto.Mensaje);
            }

            return dto;
        }

        public DTORespuesta fn_PedidoVentaEditar(DTOPedidoVentaCab Pedido, csCompany xCompany)
        {
            DTORespuesta dto = new DTORespuesta();
            IDBCPedidoVenta dbcPedido = new DBCPedidoVenta();

            string _xResult;

            try
            {
                _xResult = dbcPedido.fn_PedidoVentaEditar(Pedido, xCompany);

                if (!_xResult.Contains('-'))
                {
                    dto.Estado = false;
                    dto.Mensaje = _xResult;
                }
                else
                {
                    string[] xValor = _xResult.Split('-');

                    dto.Estado = true;
                    dto.Mensaje = xValor[0];
                    dto.key = xValor[1];
                }
            }
            catch (Exception ex)
            {
                dto.Estado = false;
                dto.Mensaje = "Se produjo un error: " + ex.Message;
            }

            return dto;
        }

        public DTORespuesta fn_CopyToOrder(DTOPedidoVentaCab pDocumento, csCompany xCompany)
        {
            DTORespuesta dto = new DTORespuesta();
            IDBCPedidoVenta dbcPedido = new DBCPedidoVenta();

            string _xResult;

            try
            {
                _xResult = dbcPedido.fn_CopyToOrder(pDocumento, xCompany);

                if (!_xResult.Contains('-'))
                {
                    dto.Estado = false;
                    dto.Mensaje = _xResult;
                }
                else
                {
                    string[] xValor = _xResult.Split('-');

                    dto.Estado = true;
                    dto.Mensaje = xValor[0];
                    dto.key = xValor[1];
                }
            }
            catch (Exception ex)
            {
                dto.Estado = false;
                dto.Mensaje = "Se produjo un error: " + ex.ToString();
            }

            return dto;
        }
        #endregion

        //-------------------------> PROMOCIONES <-------------------------//
        public DTORespuestaPedido fn_ObtenerPromocion(DTOPedidoVentaCab pedido, csCompany xCompany)
        {
            DTORespuestaPedido promocion = new DTORespuestaPedido();
            DTOPedidoVentaCab oPedido = new DTOPedidoVentaCab();
            IDBCPedidoVenta dbc = new DBCPedidoVenta();
            string xNumeroOperacion = "";
            try
            {
                xNumeroOperacion = xCompany.UserSAP.ToUpper() + "-" + DateTime.Now.ToString("yyyyMMddhhmmss") + "_" + (pedido.TipoDoc == "1" ? "139" : "133");
                bool flagReg = false;
                //Se borra la tabla temporal de promociones
                if (dbc.fn_TempPromo_Eliminar(xNumeroOperacion, xCompany))
                {
                    for(int i = 0; i<pedido.ListaDetalle.Count; i++)
                    {
                        pedido.ListaDetalle[i].LineNum = i;
                        pedido.CodOperacion = xNumeroOperacion;
                        //Se registra las lineas del pedido en la tabla temporal
                        flagReg = dbc.fn_TempPromo_Registrar(pedido, pedido.ListaDetalle[i], xCompany);                    
                    }

                    if (pedido.CondPago.ToUpper() == "CONTADO")
                    {
                        dbc.fn_TempPromoConta_Registrar(pedido, xCompany);
                    }

                    if (flagReg)
                    {
                        string isOk = dbc.fn_Promociones_Evaluar(xNumeroOperacion, xCompany.UserSAP, xCompany);
                        if(isOk == "OK")
                        {
                            List<DTOPedidoVentaDet> oLista = dbc.fn_Promociones_Buscar(xNumeroOperacion, xCompany);
                            oPedido.ListaDetalle = oLista;
                            
                            List<DTOPedidoVentaDet> oListaBoni = dbc.fn_Bonificaciones_Buscar(xNumeroOperacion, xCompany);
                            oPedido.ListaBonificacion = oListaBoni;

                            promocion.Estado = "True";
                            promocion.Mensaje = "Se recibio la lista de promociones " + xNumeroOperacion;
                            promocion.ListaPedido = new List<DTOPedidoVentaCab>{ oPedido };
                        }
                        else
                        {
                            promocion.Estado = "True";
                            promocion.Mensaje = "No se encontro la lista de promociones " + xNumeroOperacion;
                            promocion.ListaPedido = null;
                        }
                    }
                }
            }
            catch(Exception ex) 
            {
                promocion.Estado = "False";
                promocion.Mensaje = ex.Message;
                promocion.ListaPedido = null;
            }

            return promocion;
        }

        public List<DTOPromocion> fn_BoniSugeridad_Buscar(string numeroOperacion, string usuario, csCompany xCompany)
        {
            List<DTOPromocion> oLista = new List<DTOPromocion>();
            IDBCPedidoVenta dbc = new DBCPedidoVenta();

            oLista = dbc.fn_BoniSugeridad_Buscar(numeroOperacion, usuario, xCompany);

            return oLista;
        }
    }
}
