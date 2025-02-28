using BOCNegocio;
using DTOEntidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TomaPedidosApi.PDF;
using System.Threading;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace TomaPedidosApi.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ClienteController : Controller
    {
        [HttpGet]
        public DTORespuestaCliente Get(string valor, string codvendedor, string flag)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCCliente boc = new BOCCliente();
            return boc.fn_ClienteVendedor_Listar(valor, codvendedor, flag, conSap)[0];
        }

        [HttpGet("Buscar")]
        public DTORespuestaCliente GetBuscar(string codCliente)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCCliente boc = new BOCCliente();
            return boc.fn_Cliente_Buscar(codCliente, conSap);
        }
        
        [HttpGet("EeCcLista")]
        public DTORespuestaEstadoCuenta GetEecc(string codCliente)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCCliente boc = new BOCCliente();
            return boc.fn_EstadoCuenta_Listar(codCliente, conSap);
        }
        
        [HttpGet("eeccRpt")]
        public DTORespuesta GetEeccRpt(string codCliente)
        {
            csCompany conSap = new Constantes().GetConexion();
            DTORespuesta oRpt = new DTORespuesta();
            try
            {
                //using var engine = new CrystalReportsEngine();
                //engine.ViewerSettings.AllowedExportFormats = ReportViewerExportFormats.PdfFormat;
                //engine.ViewerSettings.ShowRefreshButton = false;
                //engine.ViewerSettings.ShowCopyButton = false;
                //engine.ViewerSettings.ShowGroupTreeButton = false;

                //engine.ViewerSettings.SetUICulture(Thread.CurrentThread.CurrentUICulture);

                //var report = new Report("C:\\Users\\CONSULTOR4\\Desktop\\EstadoCuenta.rpt");

                //report.Parameters.Add("P_CODIGO", codCliente);
                //report.Connection = new CrystalReportsConnection();
                //report.Connection.Username = conSap.UserBD;
                //report.Connection.Password = conSap.PwBD;
                //report.Connection.Server = conSap.ServerBD;
                //report.Connection.Database = conSap.NameBD;
                ////report.Connection.LogonProperties = 
                //report.Connection.UseIntegratedSecurity = false;

                //Task<Stream> ms = engine.Export(report, ReportExportFormats.PDF);
                //Stream stream = ms.Result;
                //byte[] bytesInStream = new byte[stream.Length];

                //oRpt.Estado = true;
                //oRpt.Mensaje = "exito";
                //oRpt.rpt = bytesInStream;

                IBOCCliente boc = new BOCCliente();
                DTORespuestaEstadoCuenta dto = boc.fn_EstadoCuenta_Listar(codCliente, conSap);
                if (dto.Estado)
                {
                    List<DTOEstadoCuenta> oLista = dto.ListaEstadoCuenta;
                    byte[] rpt = new EstadoCuenta().ReporteEECC(oLista);
                    oRpt.Estado = true;
                    oRpt.Mensaje = "exito";
                    oRpt.rpt = rpt;
                }
            }
            catch (Exception ex) 
            {
                oRpt.Estado = false;
                oRpt.Mensaje = ex.Message;
            }
            
            return oRpt;
        }

        [HttpGet("transportista")]
        public DTORespuestaCliente GetTransportista()
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCCliente boc = new BOCCliente();
            return boc.fn_Transportista_Buscar(conSap);
        }

        [HttpPost]
        public DTORespuesta Post(DTOCliente cliente)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCCliente boc = new BOCCliente();
            return boc.fn_Cliente_Registrar(cliente, conSap);
        }

        [HttpPut]
        public DTORespuesta Put(DTOCliente cliente)
        {
            csCompany conSap = new Constantes().GetConexion();
            IBOCCliente boc = new BOCCliente();
            return boc.fn_Cliente_Editar(cliente, conSap);
        }
    }
}
