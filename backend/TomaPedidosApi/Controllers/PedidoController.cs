using BOCNegocio;
using DTOEntidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System;
using TomaPedidosApi.PDF;
using Microsoft.AspNetCore.Authorization;

namespace TomaPedidosApi.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PedidoController : Controller
    {
        [HttpGet]
        public DTORespuestaPedido Get(string id, string tipo)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCPedidoVenta boc = new BOCPedidoVenta();            
            return boc.fn_PedidoVenta_Duplicar(id, tipo, conSap); 
        }

        [HttpGet("Lista")]
        public DTORespuestaPedido GetLista(string CodVendedor, string FecIni, string FecFin, string Tipo, string cliente, string Estado)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCPedidoVenta boc = new BOCPedidoVenta();
            return boc.fn_PedidoVenta_Listar(CodVendedor, FecIni, FecFin, Tipo, cliente, Estado, conSap);
        }

        [HttpGet("Tracking")]
        public DTORespuestaPedido GetTraking(string fecini, string fecfin, string codvendedor, string codcliente)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCPedidoVenta boc = new BOCPedidoVenta();
            return boc.fn_TrackingPedidoVenta_Listar(fecini, fecfin, codvendedor, codcliente, conSap);
        }

        [HttpPost]
        public DTORespuesta Post(DTOPedidoVentaCab pedido)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCPedidoVenta boc = new BOCPedidoVenta();
            return boc.fn_PedidoVentaRegistrar(pedido, conSap);
        }
        
        [HttpPut]
        public DTORespuesta Put(DTOPedidoVentaCab pedido)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCPedidoVenta boc = new BOCPedidoVenta();
            return boc.fn_PedidoVentaEditar(pedido, conSap);
        }

        [HttpPost("CopyPedido")]
        public DTORespuesta PostCopy(DTOPedidoVentaCab pedido)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCPedidoVenta boc = new BOCPedidoVenta();
            return boc.fn_CopyToOrder(pedido, conSap);
        }

        [HttpGet("Reporte")]
        public DTORespuesta GetReporte(string id, string tipo)
        {
            csCompany conSap = new Constantes().GetConexion();
            DTORespuesta oRpt = new DTORespuesta();
            try
            {
                IBOCPedidoVenta boc = new BOCPedidoVenta();
                DTORespuestaPedido oRptPedido = boc.fn_PedidoVenta_Duplicar(id, tipo, conSap);
                if (oRptPedido.Estado == "True")
                {
                    DTOPedidoVentaCab documento = oRptPedido.ListaPedido[0];

                    if(tipo == "1")
                    {
                        byte[] rpt = new Cotizacion().Reporte(documento);
                        oRpt.rpt = rpt;
                    }
                    else //if (tipo == "2")
                    {
                        byte[] rpt = new Pedido().Reporte(documento);
                        oRpt.rpt = rpt;
                    }
                    oRpt.Estado = true;
                    oRpt.Mensaje = "exito";
                }
            }
            catch (Exception ex)
            {
                oRpt.Estado = false;
                oRpt.Mensaje = ex.Message;
            }

            return oRpt;
        }

        [HttpPost("Promociones")]
        public DTORespuestaPedido PostPromo(DTOPedidoVentaCab pedido)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCPedidoVenta boc = new BOCPedidoVenta();
            return boc.fn_ObtenerPromocion(pedido, conSap);
        }

        [HttpGet("PromoSugerida")]
        public List<DTOPromocion> fn_BoniSugeridad_Buscar(string numeroOperacion)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCPedidoVenta boc = new BOCPedidoVenta();
            return boc.fn_BoniSugeridad_Buscar(numeroOperacion, conSap.UserSAP, conSap);
        }
    }
}
