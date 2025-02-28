using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.IO;
using System.Web.UI;

namespace CrystalReport
{
    public partial class index : System.Web.UI.Page
    {
        #region Variables
        private ReportDocument oRptDoc = new ReportDocument();
        private string _xNombreReporte;
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            string xPar = "";
            string xTipo = "";
            string[] xDatos;
            string[] xVariables;

            if (!IsPostBack)
            {

                try
                {
                    xPar = Request.QueryString["Parametros"];
                    Page.Response.Write("<script>console.log('" + xPar + "');</script>");
                    
                    xDatos = xPar.Split(',');
                    xVariables = xDatos[0].Trim().Split('|');
                    xTipo = xDatos[1].Trim();

                    switch (xTipo)
                    {
                        case "eecc":
                            _xNombreReporte = Properties.Settings.Default.NomReporteEECC;
                            break;
                        case "ped":
                            _xNombreReporte = Properties.Settings.Default.NomReportePedido;
                            break;
                        case "bor":
                            _xNombreReporte = Properties.Settings.Default.NomReportePedido;
                            break;
                        case "cot":
                            _xNombreReporte = Properties.Settings.Default.NomReporteCotizacion;
                            break;
                    }

                    // Muestra el reporte.
                    Page.Response.Write("<script>console.log('Descargando Crystal Report');</script>");
                    fn_CargarReporte(xVariables, _xNombreReporte, xTipo);
                }
                catch (Exception ex)
                {
                    Page.Response.Write("<script>console.log('" + ex.Message + "');</script>");
                }
                finally
                {
                    Response.Write("<script language=javascript>window.close;</script>");
                }
        }

        }
        #region Metodos de consulta

        private void fn_CargarReporte(string[] xVariables, string xNombreRpt, string xTipo)
        {
            string RutaYNombreReporte = string.Empty;
            string nameTemplate = $"{xNombreRpt}.rpt";

            string xRaiz = Properties.Settings.Default.Ruta;
            string xUser = Properties.Settings.Default.Usuario;
            string xPass = Properties.Settings.Default.Clave;
            string _xRuta = $"{xRaiz}\\{nameTemplate}";

            Page.Response.Write("<script>console.log('" + _xRuta.Replace("\\", "/") + "');</script>");

            oRptDoc.Load(_xRuta);
            //oRptDoc.SetParameterValue("@P_CodTipoContrato", codContrato);
            oRptDoc.SetParameterValue(xVariables[0], xVariables[1]);
            if(xNombreRpt == Properties.Settings.Default.NomReporteCotizacion)
                oRptDoc.SetParameterValue("P_TIPO", "1");
            if(xNombreRpt == Properties.Settings.Default.NomReportePedido && xTipo == "ped")
                oRptDoc.SetParameterValue("P_TIPO", "2");
            if(xNombreRpt == Properties.Settings.Default.NomReportePedido && xTipo == "bor")
                oRptDoc.SetParameterValue("P_TIPO", "3");

            oRptDoc.SetDatabaseLogon(xUser, xPass);

            string _xNombreDocumento = xVariables[1] + ".pdf";
            Page.Response.Write("<script>console.log('" + xUser + "-" + xPass + "');</script>");

            Stream stream = oRptDoc.ExportToStream(ExportFormatType.PortableDocFormat);

            Page.Response.Write("<script>console.log('Se obtuvo el reporte');</script>");

            Byte[] b = new byte[(int)(stream.Length + 1)];
            stream.Read(b, 0, Convert.ToInt32(stream.Length));

            Response.Clear();
            Response.Buffer = true;
            Response.ContentType = "application/pdf";

            // Automaticamente se descarga el archivo 
            Response.AddHeader("Content-Disposition", ("attachment;filename=" + _xNombreDocumento));
            // Se escribe el archivo 
            Response.BinaryWrite(b);
            Response.End();
        }

        #endregion

    }
}