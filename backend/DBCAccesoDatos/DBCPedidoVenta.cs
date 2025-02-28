using DTOEntidades;
using SAPbobsCOM;
using System;
using System.Collections.Generic;
//using System.Configuration;
using System.Data;
using System.Data.Odbc;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Tools;

namespace DBCAccesoDatos
{
    public interface IDBCPedidoVenta
    {
        DTORespuestaPedido fn_PedidoVenta_Listar(string CodVendedor, string FecIni, string FecFin, string Tipo, string cliente, string Estado, csCompany xCompany);
        DTORespuestaPedido fn_TrackingPedidoVenta_Listar(string FecIni, string FecFin, string CodVendedor, string CodCliente, csCompany xCompany);
        DTORespuestaPedido fn_PedidoVenta_Duplicar(string pNro, string pTipo, csCompany xCompany);
        string fn_PedidoVentaRegistrar(DTOPedidoVentaCab Pedido, csCompany xCompany);
        string fn_PedidoVentaEditar(DTOPedidoVentaCab pPedido, csCompany xCompany);
        string fn_CopyToOrder(DTOPedidoVentaCab pDocumento, csCompany xCompany);
        //Promociones
        bool fn_TempPromo_Eliminar(string numeroOperacion, csCompany xCompany);
        bool fn_TempPromo_Registrar(DTOPedidoVentaCab pedido, DTOPedidoVentaDet item, csCompany xCompany);
        bool fn_TempPromoConta_Registrar(DTOPedidoVentaCab pedido, csCompany xCompany);
        string fn_Promociones_Evaluar(string numeroOperacion, string usuario, csCompany xCompany);
        List<DTOPedidoVentaDet> fn_Promociones_Buscar(string numeroOperacion, csCompany xCompany);
        List<DTOPedidoVentaDet> fn_Bonificaciones_Buscar(string numeroOperacion, csCompany xCompany);
        List<DTOPromocion> fn_BoniSugeridad_Buscar(string numeroOperacion, string usuario, csCompany xCompany);
    }

    public class DBCPedidoVenta : IDBCPedidoVenta
    {
        Company oCompany;

        #region Metodos No Transaccionales
        public DTORespuestaPedido fn_PedidoVenta_Listar(string CodVendedor, string FecIni, string FecFin, string Tipo, string cliente, string Estado, csCompany xCompany)
        {
            List<DTOPedidoVentaCab> oListaPed = new List<DTOPedidoVentaCab>();
            DTOPedidoVentaCab dto = null;

            DTORespuestaPedido dtoRes = new DTORespuestaPedido();

            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm = new OdbcCommand();
            OdbcDataReader dr = null;

            try
            {
                cm.CommandText = $"CALL \"EXX_TPED_PedidoVentaxVendedor_Listar\" ('{CodVendedor}','{FecIni}','{FecFin}','{Tipo}','{cliente}','{Estado}')";
                cm.CommandType = CommandType.Text;
                cm.Connection = cn;
                cn.Open();
                dr = cm.ExecuteReader();

                while (dr.Read())
                {
                    dto = new DTOPedidoVentaCab();
                    dto.IdPedido = Convert.ToInt32(dr["DocEntry"]);
                    dto.NroPedido = dr["NroPed"].ToString();
                    dto.NomCliente = dr["NombreCliente"].ToString();
                    //dto.NroOC = dr["NroOc"].ToString();
                    //dto.Descuento = Convert.ToDouble(dr["Descuento"]);
                    dto.ImporteTotal = Convert.ToDouble(dr["Total"]);
                    dto.Moneda = dr["Moneda"].ToString();
                    dto.FecPedido = Convert.ToDateTime(dr["FechaPed"]);
                    dto.FecSolicitado = Convert.ToDateTime(dr["FecEntrega"]);
                    dto.Estado = dr["Estado"].ToString();
                    dto.EstadoPed = dr["DocStatus"].ToString();
                    oListaPed.Add(dto);
                }

                if (oListaPed.Count > 0)
                {
                    dtoRes.Estado = "True";
                    dtoRes.Mensaje = "Se recibio la lista de pedidos";
                    dtoRes.ListaPedido = oListaPed;
                }
                else
                {
                    dtoRes.Estado = "False";
                    dtoRes.Mensaje = "No se han encontrado ningún pedido con los filtros ingresados";
                    dtoRes.ListaPedido = null;
                }
            }
            catch (Exception ex)
            {
                dtoRes.Estado = "False";
                dtoRes.Mensaje = "Se produjo un error: " + ex.Message;
                dtoRes.ListaPedido = null;
            }
            finally
            {
                dr.Close();
                cn.Close();
            }
            return dtoRes;
        }

        public DTORespuestaPedido fn_TrackingPedidoVenta_Listar(string FecIni, string FecFin, string CodVendedor, string CodCliente, csCompany xCompany)
        {
            List<DTOPedidoVentaCab> oListaPed = new List<DTOPedidoVentaCab>();
            DTOPedidoVentaCab dto = null;

            DTORespuestaPedido dtoRes = new DTORespuestaPedido();
            
            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm = new OdbcCommand();
            OdbcDataReader dr = null;

            try
            {
                cm.CommandText = "[dbo].[PA_VEN_TrakingCab_Listar]";
                cm.CommandType = CommandType.Text;
                cm.Parameters.Add("@P_FecIni", OdbcType.VarChar).Value = FecIni;
                cm.Parameters.Add("@P_FecFin", OdbcType.VarChar).Value = FecFin;
                cm.Parameters.Add("@P_Vendedor", OdbcType.Int).Value = CodVendedor;
                //cm.Parameters.Add("@P_Cliente", OdbcType.VarChar).Value = CodCliente;
                cm.Connection = cn;
                cn.Open();
                dr = cm.ExecuteReader();

                while (dr.Read())
                {
                    dto = new DTOPedidoVentaCab();
                    dto.NroPedido = dr["NroPedido"].ToString();
                    dto.FecDespacho = Convert.ToDateTime(dr["FecGuia"]);
                    dto.FecFacturacion = Convert.ToDateTime(dr["FecFactBol"]);
                    dto.ImporteTotal = Convert.ToDouble(dr["ImpTotal"]);
                    dto.Estado = dr["EstadoTr"].ToString();
                    dto.EstadoPed = dr["DocStatus"].ToString();
                    oListaPed.Add(dto);
                }

                if (oListaPed.Count > 0)
                {
                    dtoRes.Estado = "True";
                    dtoRes.Mensaje = "Se recibio la lista de pedidos";
                    dtoRes.ListaPedido = oListaPed;
                }
                else
                {
                    dtoRes.Estado = "False";
                    dtoRes.Mensaje = "No se ah encontrado ningun pedido con los filtros ingresados";
                    dtoRes.ListaPedido = null;
                }
            }
            catch (Exception ex)
            {
                dtoRes.Estado = "False";
                dtoRes.Mensaje = "Se produjo un error: " + ex.Message;
                dtoRes.ListaPedido = null;
            }
            finally
            {
                dr.Close();
                cn.Close();
            }
            return dtoRes;
        }

        bool fn_ValidarAutPedidoVenta(string pCliente, string pCondPago, double pTotal, csCompany xCompany)
        {
            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm = new OdbcCommand();
            OdbcDataReader dr = null;

            bool xResultado = false; ;

            try
            {
                cm.CommandType = CommandType.Text;
                cm.CommandText = $"CALL \"EXX_TPED_ValidacionAprobaciobnPedidoVenta\" ('{pCliente}','{pTotal}','{pCondPago}')";
                //cm.Parameters.Add("@P_CardCode", OdbcType.VarChar).Value = pCliente;
                //cm.Parameters.Add("@P_Importe", OdbcType.Decimal).Value = pTotal;
                //cm.Parameters.Add("@P_CondPago", OdbcType.Int).Value = pCondPago;
                cm.Connection = cn;
                cn.Open();
                dr = cm.ExecuteReader();
                while (dr.Read())
                {
                    xResultado = dr["Resultado"].ToString() == "Y" ? true : false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dr.Close();
                cn.Close();
            }
            return xResultado;
        }

        public DTORespuestaPedido fn_PedidoVenta_Duplicar(string pNro, string pTipo, csCompany xCompany)
        {
            DTOPedidoVentaCab dtoPed = new DTOPedidoVentaCab();
            List<DTOPedidoVentaCab> oListaCab = new List<DTOPedidoVentaCab>();
            List<DTOPedidoVentaDet> oListaDet = new List<DTOPedidoVentaDet>();
            DTOPedidoVentaDet dtodet = null;

            DTORespuestaPedido dto = new DTORespuestaPedido();

            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm = new OdbcCommand();
            OdbcDataReader dr = null;

            try
            {
                cm.CommandText = $"CALL \"EXX_TPED_Documento_Buscar\" ('{pNro}','{pTipo}')";
                cm.CommandType = CommandType.Text;
                //cm.Parameters.Add("@P_DocEntry", OdbcType.VarChar).Value = pNro;
                //cm.Parameters.Add("@P_Tipo", OdbcType.VarChar).Value = pTipo;
                cm.Connection = cn;
                cn.Open();
                dr = cm.ExecuteReader();

                int i = 0;
                double xSubTotal = 0;
                double xIgv = 0;

                while (dr.Read())
                {
                    if (i == 0)
                    {
                        dtoPed = new DTOPedidoVentaCab();
                        dtoPed.IdPedido = Convert.ToInt32(dr["DocEntry"]);
                        dtoPed.NroPedido = dr["DocNum"].ToString();
                        dtoPed.CodCliente = dr["CardCode"].ToString();
                        dtoPed.NomCliente = dr["CardName"].ToString();
                        dtoPed.FecContabilizacion = Convert.ToDateTime(dr["DocDate"]);
                        dtoPed.FecPedido = Convert.ToDateTime(dr["TaxDate"]);
                        dtoPed.FecSolicitado = Convert.ToDateTime(dr["DocDueDate"]);
                        dtoPed.CodDireccion = dr["ShipToCode"].ToString();
                        dtoPed.Direccion = dr["Address2"].ToString();
                        dtoPed.Moneda = dr["DocCur"].ToString();
                        dtoPed.CondPago = dr["GroupNum"].ToString();
                        dtoPed.Direccion = dr["Address2"].ToString();
                        dtoPed.Comentario = dr["Comments"].ToString();
                        dtoPed.Sucursal = Convert.ToInt32(dr["BPLId"]);
                        dtoPed.Estado = dr["Estado"].ToString();
                        dtoPed.Series = dr["Series"].ToString();
                        dtoPed.TipoOperacion = dr["TpoOperacion"].ToString();
                        dtoPed.Compania = dr["Compania"].ToString();
                        dtoPed.CompaniaDir = dr["CompaniaDir"].ToString();
                        dtoPed.CompaniaTel = dr["CompaniaTel"].ToString();
                        dtoPed.CompaniaMail = dr["CompaniaMail"].ToString();
                        dtoPed.CompaniaRuc = dr["CompaniaRuc"].ToString();
                        dtoPed.MedioEnvio = Convert.ToInt32(dr["TrnspCode"]);
                        dtoPed.Descuento = Convert.ToDouble(dr["Descuento"]);
                        dtoPed.EstadoPed = dr["DocStatus"].ToString();
                        dtoPed.CodAgTra = dr["U_EXK_AGENCOD"].ToString();
                        dtoPed.NomAgTra = dr["U_EXK_AGENNOM"].ToString();
                        dtoPed.RucAgTra = dr["U_EXK_AGENRUC"].ToString();
                        dtoPed.CdiAgTra = dr["U_EXK_AGENIDDIREC"].ToString();
                        dtoPed.DirAgTra = dr["U_EXK_AGENDIREC"].ToString();
                        dtoPed.ZonAgTra = dr["U_EXK_AGENZONA"].ToString();

                        //dtoPed.NroOC = dr["NumAtCard"].ToString();
                        //dtoPed.Descuento = Convert.ToDouble(dr["DiscPrcnt"]);
                        //dtoPed.CodVendedor = dr["SlpCode"].ToString();
                        //dtoPed.CodTransTramo1 = dr["CodTram1"].ToString();
                        //dtoPed.NomTransTramo1 = dr["NomTram1"].ToString();
                        //dtoPed.RucTransTramo1 = dr["RucTram1"].ToString();
                        //dtoPed.DirTransTramo1 = dr["DirTram1"].ToString();
                    }

                    dtodet = new DTOPedidoVentaDet();
                    dtodet.IdProducto = dr["ItemCode"].ToString();
                    dtodet.Descripcion = dr["Dscription"].ToString();
                    dtodet.Cantidad = Convert.ToDouble(dr["Quantity"]);
                    dtodet.PrecioUnit = Convert.ToDouble(dr["Price"]);
                    //dtodet.PrecioBruto = Math.Round(dtodet.PrecioUnit * 1.18, 2);
                    dtodet.PrecioTotal = Convert.ToDouble(dr["LineTotal"]);
                    dtodet.TipoImpuesto = dr["TaxCode"].ToString();
                    dtodet.CodUndMed = Convert.ToInt32(dr["UomEntry"]);
                    dtodet.Unidad = dr["UomCode"].ToString();
                    dtodet.CodAlmacen = dr["WhsCode"].ToString();
                    dtodet.Dimension1 = dr["OcrCode"].ToString();
                    dtodet.Dimension2 = dr["OcrCode2"].ToString();
                    dtodet.Dimension3 = dr["OcrCode3"].ToString();
                    dtodet.Dimension4 = dr["OcrCode4"].ToString();
                    dtodet.Dimension5 = dr["OcrCode5"].ToString();
                    dtodet.Proyecto = dr["Project"].ToString();
                    dtodet.LineNum = Convert.ToInt32(dr["LineNum"]);
                    dtodet.Descuento = Convert.ToDouble(dr["DiscPrcnt"]);
                    xSubTotal += (dtodet.PrecioUnit * dtodet.Cantidad);

                    oListaDet.Add(dtodet);

                    i++;
                }

                if (i > 0)
                {
                    dtoPed.ListaDetalle = oListaDet;
                    oListaCab.Add(dtoPed);
                    dto.Estado = "True";
                    dto.Mensaje = "Se recibio el pedido de venta";
                    dto.ListaPedido = oListaCab;
                }
                else
                {
                    dto.Estado = "False";
                    dto.Mensaje = "No se ah encontrado ningun pedido con los filtros ingresados";
                    dto.ListaPedido = null;
                }
            }
            catch(Exception ex)
            {
                dto.Estado = "False";
                dto.Mensaje = "Se produjo un error:" + ex.Message;
                dto.ListaPedido = null;
            }
            finally
            {
                dr.Close();
                cn.Close();
            }
            return dto;
        }

        #endregion

        #region Metodos Transaccionales
        string fn_Validar(DTOPedidoVentaCab Pedido)
        {
            string xResultado = "";

            if (Pedido.FecSolicitado == null)
                xResultado += "-La fecha de entrega es obligatorio";

            if (Pedido.CodCliente == null || Pedido.CodCliente == "")
                xResultado += "-El código del cliente es obligatorio";
            else
            {
                if (Pedido.CodCliente.Length != 12)
                    xResultado += "-El código del cliente es invalido";
            }

            if (Pedido.CodVendedor == null || Pedido.CodVendedor == "")
                xResultado += "-El codigo de vendedor es obligatorio";
            
            if (Pedido.Moneda == null || Pedido.Moneda == "")
                xResultado += "-La moneda es un campo obligatorio";

            if (Pedido.CodDireccion == null || Pedido.CodDireccion == "")
                xResultado += "-El código de dirección es obligatorio";

            if (Pedido.CondPago == null || Pedido.CondPago == "" || Pedido.CondPago == "0")
                xResultado += "-La condición de pago es obligatorio";

            for (int i = 0; i < Pedido.ListaDetalle.Count; i++)
            {
                if (Pedido.ListaDetalle[i].IdProducto == null || Pedido.ListaDetalle[i].IdProducto == "")
                    xResultado += "-El código del producto de la fila " + i.ToString() + " debe ser diferente de vacio";

                if (Pedido.ListaDetalle[i].Cantidad == 0)
                    xResultado += "-La cantidad del producto de la fila " + i.ToString() + " debe ser diferente de 0";

                if (Pedido.ListaDetalle[i].PrecioUnit == 0)
                    xResultado += "-El precio unitario del producto de la fila " + i.ToString() + " debe ser diferente de 0";
            }

            return xResultado;
        }

        public string fn_PedidoVentaRegistrar(DTOPedidoVentaCab pPedido, csCompany xCompany)
        {
            string _xresult = "";
            try
            {
                _xresult = Connect(xCompany);

                if (_xresult == "")
                {
                    Documents oDoc;
                    int entryAtt = 0;
                    if (pPedido.Archivo != null && pPedido.Archivo != string.Empty)
                    {
                        Recordset rs = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                        string xQuery = "SELECT \"AttachPath\" FROM OADP";
                        rs.DoQuery(xQuery);
                        string path = "";
                        if(rs.RecordCount > 0)
                        {
                            path = rs.Fields.Item(0).Value;
                        }
                        path = path + pPedido.NomArchivo;
                        File.WriteAllBytes(path, Convert.FromBase64String(pPedido.Archivo));

                        Attachments2 oATT = oCompany.GetBusinessObject(BoObjectTypes.oAttachments2);
                        oATT.Lines.FileName = Path.GetFileNameWithoutExtension(pPedido.NomArchivo);
                        oATT.Lines.FileExtension = Path.GetExtension(pPedido.NomArchivo).Replace(".", "");
                        oATT.Lines.SourcePath = Path.GetDirectoryName(path);
                        oATT.Lines.Override = BoYesNoEnum.tYES;

                        int res = oATT.Add();

                        if (res == 0)
                        {
                            entryAtt = int.Parse(oCompany.GetNewObjectKey());                            
                        }
                        else
                        {
                            int lErrCode = 0;
                            string sErrMsg = string.Empty;
                            oCompany.GetLastError(out lErrCode, out sErrMsg);
                            throw new Exception("Attachments: " + lErrCode + " " + sErrMsg);
                        }
                    }

                    if (pPedido.TipoDoc == "1")
                    {
                        oDoc = oCompany.GetBusinessObject(BoObjectTypes.oQuotations); //----> Obtengo el objeto Cotizacion de Venta
                        oDoc.DocObjectCode = BoObjectTypes.oQuotations;
                    }
                    else
                    {
                        //Valido si el pedido de venta se va a crear como borrador
                        string _xQuery = $"SELECT U_EXX_FPAGO FROM OCTG WHERE \"GroupNum\" = {pPedido.CondPago}";
                        Recordset xRs = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                        xRs.DoQuery(_xQuery);

                        bool isContado = false;
                        string xContado = xRs.Fields.Item(0).Value;

                        if (xContado == "1")
                            isContado = true;

                        //Valido si el pedido de venta se va a crear como borrador
                        if (isContado)//if (fn_ValidarAutPedidoVenta(pDocumento.CodCliente, pDocumento.CondPago, pDocumento.ImporteTotal, xCompany))
                            oDoc = oCompany.GetBusinessObject(BoObjectTypes.oDrafts); //---->Objeto Borrador
                        else
                            oDoc = oCompany.GetBusinessObject(BoObjectTypes.oOrders); //---->Objeto Pedido

                        oDoc.DocObjectCode = BoObjectTypes.oOrders; //----> Indico que es un Orden de Venta
                    }

                    string oQuery = $"SELECT T1.\"SlpCode\", T1.\"SlpName\" FROM OCRD T0 INNER JOIN OSLP T1 ON T0.\"SlpCode\" = T1.\"SlpCode\" WHERE \"CardCode\" = '{pPedido.CodCliente}'";
                    Recordset oRecordSet = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                    oRecordSet.DoQuery(oQuery);

                    int codVendedorAsignado = oRecordSet.Fields.Item(0).Value;
                    string nomVendedorAsignado = oRecordSet.Fields.Item(1).Value;

                    oQuery = $"SELECT \"U_EXK_USDVEN\" FROM \"@EXK_DTIPOCAMBIO\" WHERE \"U_EXK_FECHA\" = '{pPedido.FecContabilizacion.ToString("yyyyMMdd")}'";
                    oRecordSet.DoQuery(oQuery);
                    double tipoCambioAux = 0;

                    if (oRecordSet.RecordCount == 0)
                    {
                        throw new Exception($"No se ha registrado el tipo de cambio en la tabla auxiliar para la fecha {pPedido.FecContabilizacion.ToString("dd/MM/yyyy")}");
                    }
                    else
                    {
                        tipoCambioAux = oRecordSet.Fields.Item(0).Value;
                    }

                    if (entryAtt != 0) oDoc.AttachmentEntry = entryAtt;

                    oDoc.DocType = BoDocumentTypes.dDocument_Items;
                    oDoc.DocDate = pPedido.FecContabilizacion;
                    oDoc.DocDueDate = pPedido.FecSolicitado;
                    oDoc.TaxDate = pPedido.FecPedido;
                    oDoc.Comments = pPedido.Comentario;
                    oDoc.CardCode = pPedido.CodCliente;
                    oDoc.CardName = pPedido.NomCliente;
                    oDoc.NumAtCard = pPedido.NroOC;
                    oDoc.FederalTaxID = pPedido.RucCliente;
                    oDoc.SalesPersonCode = Convert.ToInt32(pPedido.CodVendedor);
                    oDoc.DocCurrency = pPedido.Moneda;
                    oDoc.Address2 = pPedido.Direccion;
                    oDoc.ShipToCode = pPedido.CodDireccion;
                    oDoc.DiscountPercent = pPedido.Descuento;
                    oDoc.PaymentGroupCode = Convert.ToInt32(pPedido.CondPago);
                    oDoc.Series = Convert.ToInt32(pPedido.Series);

                    if (pPedido.Sucursal != 0) oDoc.BPL_IDAssignedToInvoice = pPedido.Sucursal;
                    if (pPedido.MedioEnvio != -1) oDoc.TransportationCode = pPedido.MedioEnvio;

                    oDoc.UserFields.Fields.Item("U_EXX_TPED_CVENDASIG").Value = codVendedorAsignado;
                    oDoc.UserFields.Fields.Item("U_EXX_TPED_VENDASIG").Value = nomVendedorAsignado;
                    oDoc.UserFields.Fields.Item("U_EXX_TIPOOPER").Value = pPedido.TipoOperacion;
                    oDoc.UserFields.Fields.Item("U_EXX_TPED_LATITUD").Value = pPedido.Latitud;
                    oDoc.UserFields.Fields.Item("U_EXX_TPED_LONGITUD").Value = pPedido.Longitud;
                    oDoc.UserFields.Fields.Item("U_EXX_TPED_USERREG").Value = pPedido.UserReg;
                    //Campos de Kamasa
                    oDoc.UserFields.Fields.Item("U_EXK_CVENDASIG").Value = codVendedorAsignado;
                    oDoc.UserFields.Fields.Item("U_EXK_VENDASIG").Value = nomVendedorAsignado;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENCOD").Value = pPedido.CodAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENNOM").Value = pPedido.NomAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENRUC").Value = pPedido.RucAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENIDDIREC").Value = pPedido.CdiAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENDIREC").Value = pPedido.DirAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENZONA").Value = pPedido.ZonAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_TCUSD").Value = tipoCambioAux;

                    for (int i = 0; i < pPedido.ListaDetalle.Count; i++)
                    {
                        oDoc.Lines.ItemCode = pPedido.ListaDetalle[i].IdProducto;
                        oDoc.Lines.ItemDescription = pPedido.ListaDetalle[i].Descripcion;
                        oDoc.Lines.Quantity = pPedido.ListaDetalle[i].Cantidad;
                        if (!pPedido.ListaDetalle[i].IsBonificacion)                        
                        {
                            oDoc.Lines.UnitPrice = pPedido.ListaDetalle[i].PrecioUnit;
                            oDoc.Lines.UoMEntry = pPedido.ListaDetalle[i].CodUndMed;
                        }
                        
                        oDoc.Lines.TaxCode = pPedido.ListaDetalle[i].TipoImpuesto;
                        oDoc.Lines.WarehouseCode = pPedido.ListaDetalle[i].CodAlmacen;
                        oDoc.Lines.ProjectCode = pPedido.ListaDetalle[i].Proyecto;
                        oDoc.Lines.CostingCode = pPedido.ListaDetalle[i].Dimension1;
                        oDoc.Lines.CostingCode2 = pPedido.ListaDetalle[i].Dimension2;
                        oDoc.Lines.CostingCode3 = pPedido.ListaDetalle[i].Dimension3;
                        oDoc.Lines.CostingCode4 = pPedido.ListaDetalle[i].Dimension4;
                        oDoc.Lines.CostingCode5 = pPedido.ListaDetalle[i].Dimension5;
                        oDoc.Lines.DiscountPercent = pPedido.ListaDetalle[i].Descuento;

                        ////a Solicitud de Alejandro Jara
                        //if (pPedido.ListaDetalle[i].PrecioTotal != 0)
                        //    oDoc.Lines.LineTotal = pPedido.ListaDetalle[i].PrecioTotal;

                        //Campos de promociones
                        if(pPedido.ListaDetalle[i].U_EXP_TIPO != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_TIPO").Value = pPedido.ListaDetalle[i].U_EXP_TIPO;
                        if(pPedido.ListaDetalle[i].U_EXP_PROMOCION != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_CODIGO").Value = pPedido.ListaDetalle[i].U_EXP_PROMOCION;
                        oDoc.Lines.UserFields.Fields.Item("U_EXP_VALOR").Value = pPedido.ListaDetalle[i].U_EXP_VALOR;
                        oDoc.Lines.UserFields.Fields.Item("U_EXP_ASIGNAR").Value = pPedido.ListaDetalle[i].U_EXP_ASIGNAR;
                        if(pPedido.ListaDetalle[i].U_EXP_COLOR != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_COLOR").Value = pPedido.ListaDetalle[i].U_EXP_COLOR;
                        oDoc.Lines.UserFields.Fields.Item("U_EXP_PRECIO").Value = pPedido.ListaDetalle[i].PrecioUnit;
                        if (pPedido.ListaDetalle[i].U_EXP_REFERENCIA != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_REFERENCIA").Value = pPedido.ListaDetalle[i].U_EXP_REFERENCIA;

                        if ((i + 1) < pPedido.ListaDetalle.Count)
                            oDoc.Lines.Add();
                    }

                    int result = oDoc.Add();

                    int _result = result;
                    string _Result = "";
                    string _xRespuesta = "";
                    string _xType = "";

                    oCompany.GetLastError(out _result, out _Result);

                    if (_result > -1)
                    {
                        oCompany.GetNewObjectCode(out _xRespuesta);
                        _xType = oCompany.GetNewObjectType();

                        oDoc.GetByKey(Convert.ToInt32(_xRespuesta));

                        if (_xType == "112")
                            _xresult = "El pedido de venta se registró con éxito " + oDoc.DocNum + " y numero preliminar " + oDoc.DocEntry + " y esta pasando por aprobación" + "-" + _xRespuesta;
                        if (_xType == "17")
                            _xresult = "El pedido de venta se registró con éxito " + oDoc.DocNum.ToString() + "-" + _xRespuesta;
                        if (_xType == "23")
                            _xresult = "La cotización de venta se registró con éxito " + oDoc.DocNum.ToString() + "-" + _xRespuesta;
                    }
                    else
                        _xresult = _Result.Replace("-", " ");
                }
            }
            catch (Exception ex)
            {
                _xresult = ex.Message;
            }
            finally
            {
                oCompany.Disconnect();
            }
            return _xresult;
        }

        public string fn_PedidoVentaEditar(DTOPedidoVentaCab pPedido, csCompany xCompany)
        {
            string _xresult = "";
            try
            {
                _xresult = Connect(xCompany);

                if (_xresult == "")
                {
                    Documents oDoc;
                    int entryAtt = 0;
                    if (pPedido.Archivo != null && pPedido.Archivo != string.Empty)
                    {
                        Recordset rs = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                        string xQuery = "SELECT \"AttachPath\" FROM OADP";
                        rs.DoQuery(xQuery);
                        string path = "";
                        if (rs.RecordCount > 0)
                        {
                            path = rs.Fields.Item(0).Value;
                        }
                        path = path + pPedido.NomArchivo;
                        File.WriteAllBytes(path, Convert.FromBase64String(pPedido.Archivo));

                        Attachments2 oATT = oCompany.GetBusinessObject(BoObjectTypes.oAttachments2);
                        oATT.Lines.FileName = Path.GetFileNameWithoutExtension(pPedido.NomArchivo);
                        oATT.Lines.FileExtension = Path.GetExtension(pPedido.NomArchivo).Replace(".", "");
                        oATT.Lines.SourcePath = Path.GetDirectoryName(path);
                        oATT.Lines.Override = BoYesNoEnum.tYES;

                        int res = oATT.Add();

                        if (res == 0)
                        {
                            entryAtt = int.Parse(oCompany.GetNewObjectKey());
                        }
                        else
                        {
                            int lErrCode = 0;
                            string sErrMsg = string.Empty;
                            oCompany.GetLastError(out lErrCode, out sErrMsg);
                            throw new Exception("Attachments: " + lErrCode + " " + sErrMsg);
                        }
                    }

                    if (pPedido.TipoDoc == "1")
                    {
                        oDoc = oCompany.GetBusinessObject(BoObjectTypes.oQuotations); //----> Obtengo el objeto Cotizacion de Venta
                        oDoc.DocObjectCode = BoObjectTypes.oQuotations;
                    }
                    else
                    {
                        //Valido si el pedido de venta se va a crear como borrador
                        string _xQuery = $"SELECT U_EXX_FPAGO FROM OCTG WHERE \"GroupNum\" = {pPedido.CondPago}";
                        Recordset xRs = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                        xRs.DoQuery(_xQuery);

                        bool isContado = false;
                        string xContado = xRs.Fields.Item(0).Value;

                        if (xContado == "1")
                            isContado = true;

                        //Valido si el pedido de venta se va a crear como borrador
                        if (isContado)//if (fn_ValidarAutPedidoVenta(pDocumento.CodCliente, pDocumento.CondPago, pDocumento.ImporteTotal, xCompany))
                            oDoc = oCompany.GetBusinessObject(BoObjectTypes.oDrafts); //---->Objeto Borrador
                        else
                            oDoc = oCompany.GetBusinessObject(BoObjectTypes.oOrders); //---->Objeto Pedido

                        oDoc.DocObjectCode = BoObjectTypes.oOrders; //----> Indico que es un Orden de Venta
                    }

                    string oQuery = $"SELECT T1.\"SlpCode\", T1.\"SlpName\" FROM OCRD T0 INNER JOIN OSLP T1 ON T0.\"SlpCode\" = T1.\"SlpCode\" WHERE \"CardCode\" = '{pPedido.CodCliente}'";
                    Recordset oRecordSet = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                    oRecordSet.DoQuery(oQuery);

                    int codVendedorAsignado = oRecordSet.Fields.Item(0).Value;
                    string nomVendedorAsignado = oRecordSet.Fields.Item(1).Value;

                    oQuery = $"SELECT \"U_EXK_USDVEN\" FROM \"@EXK_DTIPOCAMBIO\" WHERE \"U_EXK_FECHA\" = '{pPedido.FecContabilizacion.ToString("yyyyMMdd")}'";
                    oRecordSet.DoQuery(oQuery);
                    double tipoCambioAux = 0;

                    if (oRecordSet.RecordCount == 0)
                    {
                        throw new Exception($"No se ha registrado el tipo de cambio en la tabla auxiliar para la fecha {pPedido.FecContabilizacion.ToString("dd/MM/yyyy")}");
                    }
                    else
                    {
                        tipoCambioAux = oRecordSet.Fields.Item(0).Value;
                    }

                    //Se Obtiene el documento
                    oDoc.GetByKey(pPedido.IdPedido);

                    if (entryAtt != 0) oDoc.AttachmentEntry = entryAtt;

                    //oDoc.DocType = BoDocumentTypes.dDocument_Items;
                    //oDoc.DocDate = pPedido.FecContabilizacion;
                    //oDoc.DocDueDate = pPedido.FecSolicitado;
                    //oDoc.TaxDate = pPedido.FecPedido;
                    oDoc.Comments = pPedido.Comentario;
                    //oDoc.CardCode = pPedido.CodCliente;
                    //oDoc.CardName = pPedido.NomCliente;
                    oDoc.NumAtCard = pPedido.NroOC;
                    //oDoc.FederalTaxID = pPedido.RucCliente;
                    //oDoc.SalesPersonCode = Convert.ToInt32(pPedido.CodVendedor);
                    //oDoc.DocCurrency = pPedido.Moneda;
                    //oDoc.Address2 = pPedido.Direccion;
                    //oDoc.ShipToCode = pPedido.CodDireccion;
                    //oDoc.DiscountPercent = pPedido.Descuento;
                    //oDoc.PaymentGroupCode = Convert.ToInt32(pPedido.CondPago);
                    //oDoc.Series = Convert.ToInt32(pPedido.Series);

                    //if (pPedido.Sucursal != 0) oDoc.BPL_IDAssignedToInvoice = pPedido.Sucursal;
                    if (pPedido.MedioEnvio != -1) oDoc.TransportationCode = pPedido.MedioEnvio;

                    //oDoc.UserFields.Fields.Item("U_EXX_TPED_CVENDASIG").Value = codVendedorAsignado;
                    //oDoc.UserFields.Fields.Item("U_EXX_TPED_VENDASIG").Value = nomVendedorAsignado;
                    //oDoc.UserFields.Fields.Item("U_EXX_TIPOOPER").Value = pPedido.TipoOperacion;
                    //oDoc.UserFields.Fields.Item("U_EXX_TPED_LATITUD").Value = pPedido.Latitud;
                    //oDoc.UserFields.Fields.Item("U_EXX_TPED_LONGITUD").Value = pPedido.Longitud;
                    //oDoc.UserFields.Fields.Item("U_EXX_TPED_USERREG").Value = pPedido.UserReg;
                    //Campos de Kamasa
                    oDoc.UserFields.Fields.Item("U_EXK_AGENCOD").Value = pPedido.CodAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENNOM").Value = pPedido.NomAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENRUC").Value = pPedido.RucAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENIDDIREC").Value = pPedido.CdiAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENDIREC").Value = pPedido.DirAgTra;
                    oDoc.UserFields.Fields.Item("U_EXK_AGENZONA").Value = pPedido.ZonAgTra;
                    //oDoc.UserFields.Fields.Item("U_EXK_TCUSD").Value = tipoCambioAux;

                    for (int i = 0; i < pPedido.ListaDetalle.Count; i++)
                    {
                        if (pPedido.ListaDetalle[i].LineNum >= 0)
                        {
                            oDoc.Lines.SetCurrentLine(pPedido.ListaDetalle[i].LineNum);
                            //oDoc.Lines.ItemCode = pPedido.ListaDetalle[i].IdProducto;
                            //oDoc.Lines.ItemDescription = pPedido.ListaDetalle[i].Descripcion;
                            oDoc.Lines.Quantity = pPedido.ListaDetalle[i].Cantidad;
                            if (!pPedido.ListaDetalle[i].IsBonificacion)
                            {
                                oDoc.Lines.UnitPrice = pPedido.ListaDetalle[i].PrecioUnit;
                                oDoc.Lines.UoMEntry = pPedido.ListaDetalle[i].CodUndMed;
                            }

                            oDoc.Lines.TaxCode = pPedido.ListaDetalle[i].TipoImpuesto;
                            oDoc.Lines.WarehouseCode = pPedido.ListaDetalle[i].CodAlmacen;
                            oDoc.Lines.ProjectCode = pPedido.ListaDetalle[i].Proyecto;
                            oDoc.Lines.CostingCode = pPedido.ListaDetalle[i].Dimension1;
                            oDoc.Lines.CostingCode2 = pPedido.ListaDetalle[i].Dimension2;
                            oDoc.Lines.CostingCode3 = pPedido.ListaDetalle[i].Dimension3;
                            oDoc.Lines.CostingCode4 = pPedido.ListaDetalle[i].Dimension4;
                            oDoc.Lines.CostingCode5 = pPedido.ListaDetalle[i].Dimension5;
                            oDoc.Lines.DiscountPercent = pPedido.ListaDetalle[i].Descuento;

                            ////a Solicitud de Alejandro Jara
                            //if (pPedido.ListaDetalle[i].PrecioTotal != 0)
                            //    oDoc.Lines.LineTotal = pPedido.ListaDetalle[i].PrecioTotal;

                            //Campos de promociones
                            if (pPedido.ListaDetalle[i].U_EXP_TIPO != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_TIPO").Value = pPedido.ListaDetalle[i].U_EXP_TIPO;
                            if (pPedido.ListaDetalle[i].U_EXP_PROMOCION != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_CODIGO").Value = pPedido.ListaDetalle[i].U_EXP_PROMOCION;
                            oDoc.Lines.UserFields.Fields.Item("U_EXP_VALOR").Value = pPedido.ListaDetalle[i].U_EXP_VALOR;
                            oDoc.Lines.UserFields.Fields.Item("U_EXP_ASIGNAR").Value = pPedido.ListaDetalle[i].U_EXP_ASIGNAR;
                            if (pPedido.ListaDetalle[i].U_EXP_COLOR != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_COLOR").Value = pPedido.ListaDetalle[i].U_EXP_COLOR;
                            oDoc.Lines.UserFields.Fields.Item("U_EXP_PRECIO").Value = pPedido.ListaDetalle[i].PrecioUnit;
                            if (pPedido.ListaDetalle[i].U_EXP_REFERENCIA != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_REFERENCIA").Value = pPedido.ListaDetalle[i].U_EXP_REFERENCIA;
                        }
                        else
                        {
                            oDoc.Lines.Add();
                            oDoc.Lines.ItemCode = pPedido.ListaDetalle[i].IdProducto;
                            oDoc.Lines.ItemDescription = pPedido.ListaDetalle[i].Descripcion;
                            oDoc.Lines.Quantity = pPedido.ListaDetalle[i].Cantidad;
                            if (!pPedido.ListaDetalle[i].IsBonificacion)
                            {
                                oDoc.Lines.UnitPrice = pPedido.ListaDetalle[i].PrecioUnit;
                                oDoc.Lines.UoMEntry = pPedido.ListaDetalle[i].CodUndMed;
                            }

                            oDoc.Lines.TaxCode = pPedido.ListaDetalle[i].TipoImpuesto;
                            oDoc.Lines.WarehouseCode = pPedido.ListaDetalle[i].CodAlmacen;
                            oDoc.Lines.ProjectCode = pPedido.ListaDetalle[i].Proyecto;
                            oDoc.Lines.CostingCode = pPedido.ListaDetalle[i].Dimension1;
                            oDoc.Lines.CostingCode2 = pPedido.ListaDetalle[i].Dimension2;
                            oDoc.Lines.CostingCode3 = pPedido.ListaDetalle[i].Dimension3;
                            oDoc.Lines.CostingCode4 = pPedido.ListaDetalle[i].Dimension4;
                            oDoc.Lines.CostingCode5 = pPedido.ListaDetalle[i].Dimension5;
                            oDoc.Lines.DiscountPercent = pPedido.ListaDetalle[i].Descuento;

                            ////a Solicitud de Alejandro Jara
                            //if (pPedido.ListaDetalle[i].PrecioTotal != 0)
                            //    oDoc.Lines.LineTotal = pPedido.ListaDetalle[i].PrecioTotal;

                            //Campos de promociones
                            if (pPedido.ListaDetalle[i].U_EXP_TIPO != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_TIPO").Value = pPedido.ListaDetalle[i].U_EXP_TIPO;
                            if (pPedido.ListaDetalle[i].U_EXP_PROMOCION != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_CODIGO").Value = pPedido.ListaDetalle[i].U_EXP_PROMOCION;
                            oDoc.Lines.UserFields.Fields.Item("U_EXP_VALOR").Value = pPedido.ListaDetalle[i].U_EXP_VALOR;
                            oDoc.Lines.UserFields.Fields.Item("U_EXP_ASIGNAR").Value = pPedido.ListaDetalle[i].U_EXP_ASIGNAR;
                            if (pPedido.ListaDetalle[i].U_EXP_COLOR != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_COLOR").Value = pPedido.ListaDetalle[i].U_EXP_COLOR;
                            oDoc.Lines.UserFields.Fields.Item("U_EXP_PRECIO").Value = pPedido.ListaDetalle[i].PrecioUnit;
                            if (pPedido.ListaDetalle[i].U_EXP_REFERENCIA != null) oDoc.Lines.UserFields.Fields.Item("U_EXP_REFERENCIA").Value = pPedido.ListaDetalle[i].U_EXP_REFERENCIA;
                        }
                    }

                    //Se elimina la linea del pedido
                    for (int j = 0; j < oDoc.Lines.Count; j++)
                    {
                        oDoc.Lines.SetCurrentLine(j);
                        bool xflag = false;
                        for (int x = 0; x < pPedido.ListaDetalle.Count; x++)
                        {
                            if(pPedido.ListaDetalle[x].LineNum >= 0)
                            {
                                if (oDoc.Lines.VisualOrder == pPedido.ListaDetalle[x].LineNum)
                                    xflag = true;
                            }
                        }

                        if (!xflag)
                            oDoc.Lines.Delete();
                    }

                    int result = oDoc.Update();

                    int _result = result;
                    string _Result = "";
                    string _xRespuesta = "";
                    string _xType = "";

                    oCompany.GetLastError(out _result, out _Result);

                    if (_result > -1)
                    {
                        oCompany.GetNewObjectCode(out _xRespuesta);
                        _xType = oCompany.GetNewObjectType();

                        oDoc.GetByKey(Convert.ToInt32(_xRespuesta));

                        if (_xType == "112")
                            _xresult = "El pedido de venta se registró con éxito " + oDoc.DocNum + " y numero preliminar " + oDoc.DocEntry + " y esta pasando por aprobación" + "-" + _xRespuesta;
                        if (_xType == "17")
                            _xresult = "El pedido de venta se registró con éxito " + oDoc.DocNum.ToString() + "-" + _xRespuesta;
                        if (_xType == "23")
                            _xresult = "La cotización de venta se registró con éxito " + oDoc.DocNum.ToString() + "-" + _xRespuesta;
                    }
                    else
                        _xresult = _Result.Replace("-", " ");
                }
            }
            catch (Exception ex)
            {
                _xresult = ex.Message;
            }
            finally
            {
                oCompany.Disconnect();
            }
            return _xresult;
        }

        public string fn_CopyToOrder(DTOPedidoVentaCab pDocumento, csCompany xCompany)
        {
            string xRpt = "";
            string xCampo = "";

            try
            {
                xRpt = Connect(xCompany);

                if (xRpt == "")
                {
                    int entryAtt = 0;

                    if (pDocumento.Archivo != null && pDocumento.Archivo != string.Empty)
                    {
                        Recordset rs = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                        string xQuery = "SELECT \"AttachPath\" FROM OADP";
                        rs.DoQuery(xQuery);
                        string path = "";
                        if (rs.RecordCount > 0)
                        {
                            path = rs.Fields.Item(0).Value;
                        }
                        path = path + pDocumento.NomArchivo;
                        File.WriteAllBytes(path, Convert.FromBase64String(pDocumento.Archivo));

                        Attachments2 oATT = oCompany.GetBusinessObject(BoObjectTypes.oAttachments2);
                        oATT.Lines.FileName = Path.GetFileNameWithoutExtension(pDocumento.NomArchivo);
                        oATT.Lines.FileExtension = Path.GetExtension(pDocumento.NomArchivo).Replace(".", "");
                        oATT.Lines.SourcePath = Path.GetDirectoryName(path);
                        oATT.Lines.Override = BoYesNoEnum.tYES;

                        int res = oATT.Add();

                        if (res == 0)
                        {
                            entryAtt = int.Parse(oCompany.GetNewObjectKey());
                        }
                        else
                        {
                            int lErrCode = 0;
                            string sErrMsg = string.Empty;
                            oCompany.GetLastError(out lErrCode, out sErrMsg);
                            throw new Exception("Attachments: " + lErrCode + " " + sErrMsg);
                        }
                    }

                    Documents oDoc = oCompany.GetBusinessObject(BoObjectTypes.oQuotations);
                    oDoc.GetByKey(pDocumento.IdPedido);

                    Documents oPed;

                    string _xQuery = $"SELECT U_EXX_FPAGO FROM OCTG WHERE \"GroupNum\" = {oDoc.PaymentGroupCode}";
                    Recordset xRs = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                    xRs.DoQuery(_xQuery);

                    bool isContado = false;
                    string xContado = xRs.Fields.Item(0).Value;

                    if (xContado == "1") 
                        isContado = true;

                    //Valido si el pedido de venta se va a crear como borrador
                    if(isContado)//if (fn_ValidarAutPedidoVenta(pDocumento.CodCliente, pDocumento.CondPago, pDocumento.ImporteTotal, xCompany))
                        oPed = oCompany.GetBusinessObject(BoObjectTypes.oDrafts); //---->Objeto Borrador
                    else
                        oPed = oCompany.GetBusinessObject(BoObjectTypes.oOrders); //---->Objeto Pedido

                    string oQuery = $"SELECT T1.\"SlpCode\", T1.\"SlpName\" FROM OCRD T0 INNER JOIN OSLP T1 ON T0.\"SlpCode\" = T1.\"SlpCode\" WHERE \"CardCode\" = '{oDoc.CardCode}'";
                    Recordset oRecordSet = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                    oRecordSet.DoQuery(oQuery);

                    int codVendedorAsignado = oRecordSet.Fields.Item(0).Value;
                    string nomVendedorAsignado = oRecordSet.Fields.Item(1).Value;

                    oPed.DocObjectCode = BoObjectTypes.oOrders;
                    oPed.CardCode = oDoc.CardCode;
                    oPed.CardName = oDoc.CardName;
                    xCampo = "DocDate"; oPed.DocDate = pDocumento.FecContabilizacion;
                    xCampo = "TaxDate"; oPed.TaxDate = pDocumento.FecPedido;
                    xCampo = "DocDueDate"; oPed.DocDueDate = pDocumento.FecSolicitado;
                    xCampo = "DocCurrency"; oPed.DocCurrency = oDoc.DocCurrency;
                    xCampo = "ShipToCode"; oPed.ShipToCode = oDoc.ShipToCode;
                    xCampo = "PaymentGroupCode"; oPed.PaymentGroupCode = oDoc.PaymentGroupCode;
                    xCampo = "Series"; oPed.Series = Convert.ToInt32(pDocumento.Series);
                    xCampo = "NumAtCard"; oPed.NumAtCard = pDocumento.NroOC;
                    xCampo = "SalesPersonCode"; oPed.SalesPersonCode = oDoc.SalesPersonCode;
                    xCampo = "DiscountPercent"; oPed.DiscountPercent = oDoc.DiscountPercent;

                    xCampo = "U_EXX_TPED_CVENDASIG"; oDoc.UserFields.Fields.Item("U_EXX_TPED_CVENDASIG").Value = codVendedorAsignado;
                    xCampo = "U_EXX_TPED_VENDASIG"; oDoc.UserFields.Fields.Item("U_EXX_TPED_VENDASIG").Value = nomVendedorAsignado;
                    xCampo = "U_EXX_TPED_LATITUD"; oPed.UserFields.Fields.Item("U_EXX_TPED_LATITUD").Value = oDoc.UserFields.Fields.Item("U_EXX_TPED_LATITUD").Value;
                    xCampo = "U_EXX_TPED_LONGITUD"; oPed.UserFields.Fields.Item("U_EXX_TPED_LONGITUD").Value = oDoc.UserFields.Fields.Item("U_EXX_TPED_LONGITUD").Value;
                    xCampo = "U_EXX_TIPOOPER"; oPed.UserFields.Fields.Item("U_EXX_TIPOOPER").Value = oDoc.UserFields.Fields.Item("U_EXX_TIPOOPER").Value;
                    xCampo = "U_EXX_TPED_USERREG"; oPed.UserFields.Fields.Item("U_EXX_TPED_USERREG").Value = oDoc.UserFields.Fields.Item("U_EXX_TPED_USERREG").Value;
                    //Campos de usuarios de Kamasa
                    xCampo = "U_EXK_AGENCOD"; oPed.UserFields.Fields.Item("U_EXK_AGENCOD").Value = oDoc.UserFields.Fields.Item("U_EXK_AGENCOD").Value;
                    xCampo = "U_EXK_AGENNOM"; oPed.UserFields.Fields.Item("U_EXK_AGENNOM").Value = oDoc.UserFields.Fields.Item("U_EXK_AGENNOM").Value;
                    xCampo = "U_EXK_AGENRUC"; oPed.UserFields.Fields.Item("U_EXK_AGENRUC").Value = oDoc.UserFields.Fields.Item("U_EXK_AGENRUC").Value;
                    xCampo = "U_EXK_AGENIDDIREC"; oPed.UserFields.Fields.Item("U_EXK_AGENIDDIREC").Value = oDoc.UserFields.Fields.Item("U_EXK_AGENIDDIREC").Value;
                    xCampo = "U_EXK_AGENDIREC"; oPed.UserFields.Fields.Item("U_EXK_AGENDIREC").Value = oDoc.UserFields.Fields.Item("U_EXK_AGENDIREC").Value;
                    xCampo = "U_EXK_AGENZONA"; oPed.UserFields.Fields.Item("U_EXK_AGENZONA").Value = oDoc.UserFields.Fields.Item("U_EXK_AGENZONA").Value;
                    xCampo = "U_EXK_TCUSD"; oPed.UserFields.Fields.Item("U_EXK_TCUSD").Value = oDoc.UserFields.Fields.Item("U_EXK_TCUSD").Value;

                    if (entryAtt != 0) oPed.AttachmentEntry = entryAtt;

                    oPed.BPL_IDAssignedToInvoice = oDoc.BPL_IDAssignedToInvoice;
                    if (pDocumento.MedioEnvio != -1) oDoc.TransportationCode = pDocumento.MedioEnvio;

                    int i = 0;
                    foreach(DTOPedidoVentaDet item in pDocumento.ListaDetalle)//for (int i = 0; i < pDocumento.ListaDetalle.Count; i++)
                    {
                        if (item.LineNum >= 0)
                        {
                            oDoc.Lines.SetCurrentLine(item.LineNum);
                            
                            xCampo = "BaseEntry"; oPed.Lines.BaseEntry = oDoc.DocEntry;
                            xCampo = "BaseType"; oPed.Lines.BaseType = 23;
                            xCampo = "BaseLine"; oPed.Lines.BaseLine = oDoc.Lines.LineNum;
                            xCampo = "Quantity"; oPed.Lines.Quantity = item.Cantidad;
                            xCampo = "ProjectCode"; oPed.Lines.ProjectCode = item.Proyecto; 
                            xCampo = "CostingCode"; oPed.Lines.CostingCode = item.Dimension1;
                            xCampo = "CostingCode2"; oPed.Lines.CostingCode2 = item.Dimension2;
                            xCampo = "CostingCode3"; oPed.Lines.CostingCode3 = item.Dimension3;
                            xCampo = "CostingCode4"; oPed.Lines.CostingCode4 = item.Dimension4;
                            xCampo = "CostingCode5"; oPed.Lines.CostingCode5 = item.Dimension5;
                            xCampo = "UoMEntry"; oPed.Lines.UoMEntry = item.CodUndMed;
                            xCampo = "WarehouseCode"; oPed.Lines.WarehouseCode = item.CodAlmacen;
                            xCampo = "DiscountPercent"; oPed.Lines.DiscountPercent = oDoc.Lines.DiscountPercent;
                        }
                        else
                        {
                            xCampo = "ItemCode"; oPed.Lines.ItemCode = item.IdProducto;
                            xCampo = "ItemDescription"; oPed.Lines.ItemDescription = item.Descripcion;
                            xCampo = "Quantity"; oPed.Lines.Quantity = item.Cantidad;
                            xCampo = "UnitPrice"; oPed.Lines.UnitPrice = item.PrecioUnit;
                            xCampo = "TaxCode"; oPed.Lines.TaxCode = item.TipoImpuesto;
                            xCampo = "WarehouseCode"; oPed.Lines.WarehouseCode = item.CodAlmacen;
                            xCampo = "ProjectCode"; oPed.Lines.ProjectCode = item.Proyecto;
                            xCampo = "CostingCode"; oPed.Lines.CostingCode = item.Dimension1;
                            xCampo = "CostingCode2"; oPed.Lines.CostingCode2 = item.Dimension2;
                            xCampo = "CostingCode3"; oPed.Lines.CostingCode3 = item.Dimension3;
                            xCampo = "CostingCode4"; oPed.Lines.CostingCode4 = item.Dimension4;
                            xCampo = "CostingCode5"; oPed.Lines.CostingCode5 = item.Dimension5;
                            xCampo = "UoMEntry"; oPed.Lines.UoMEntry = item.CodUndMed;
                            xCampo = "DiscountPercent"; oPed.Lines.DiscountPercent = item.Descuento;
                        }

                        xCampo = "U_EXP_TIPO"; oPed.Lines.UserFields.Fields.Item("U_EXP_TIPO").Value = item.U_EXP_TIPO;
                        xCampo = "U_EXP_CODIGO"; oPed.Lines.UserFields.Fields.Item("U_EXP_CODIGO").Value = item.U_EXP_PROMOCION;
                        xCampo = "U_EXP_VALOR"; oPed.Lines.UserFields.Fields.Item("U_EXP_VALOR").Value = item.U_EXP_VALOR;
                        xCampo = "U_EXP_ASIGNAR"; oPed.Lines.UserFields.Fields.Item("U_EXP_ASIGNAR").Value = item.U_EXP_ASIGNAR;
                        xCampo = "U_EXP_COLOR"; oPed.Lines.UserFields.Fields.Item("U_EXP_COLOR").Value = item.U_EXP_COLOR;
                        xCampo = "U_EXP_PRECIO"; oPed.Lines.UserFields.Fields.Item("U_EXP_PRECIO").Value = item.PrecioUnit;
                        xCampo = "U_EXP_REFERENCIA"; oPed.Lines.UserFields.Fields.Item("U_EXP_REFERENCIA").Value = item.U_EXP_REFERENCIA;

                        if ((i + 1) < pDocumento.ListaDetalle.Count)
                            oPed.Lines.Add();
                    }

                    int result = oPed.Add();

                    int _result = result;
                    string _Result = "";
                    string _xRespuesta = "";
                    string _xType = "";

                    oCompany.GetLastError(out _result, out _Result);

                    if (_result > -1)
                    {
                        oCompany.GetNewObjectCode(out _xRespuesta);
                        _xType = oCompany.GetNewObjectType();

                        oPed.GetByKey(Convert.ToInt32(_xRespuesta));

                        if (_xType == "112")
                            xRpt = "El pedido de venta se registró con éxito " + oPed.DocNum + " y numero preliminar " + oPed.DocEntry + " y esta pasando por aprobación" + "-" + _xRespuesta;
                        if (_xType == "17")
                            xRpt = "El pedido de venta se registró con éxito " + oPed.DocNum.ToString() + "-" + _xRespuesta;
                    }
                    else
                        xRpt = _Result.Replace("-", " ") + "|" + xCampo;
                }
            }
            catch(Exception ex)
            {
                xRpt = ex.Message + "|" + xCampo;
            }
            finally
            {
                oCompany.Disconnect();
            }
            return xRpt;
        }


        //---------------------> PROMOCIONES <--------------------//
        public bool fn_TempPromo_Eliminar(string numeroOperacion, csCompany xCompany)
        {
            bool _Rpta;
            try
            {
                string xRpta = "";
                xRpta = Connect(xCompany);
                string oQuery = "";
                Recordset recordset;
                oQuery = $"DELETE FROM \"@EXP_PROMO_TEMP\" WHERE \"U_EXP_CODOPERACION\" = '{numeroOperacion}'";
                recordset = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                recordset.DoQuery(oQuery);

                oQuery = $"DELETE FROM \"@EXP_FPAGO_TEMP\" WHERE \"U_EXP_CODOPERACION\" = '{numeroOperacion}'";
                recordset = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                recordset.DoQuery(oQuery);

                _Rpta = true;
            }
            catch (Exception ex)
            {
                _Rpta = false;
                throw ex;
            }
            finally
            {
                oCompany.Disconnect();
            }

            return _Rpta;
        }

        public bool fn_TempPromo_Registrar(DTOPedidoVentaCab pedido, DTOPedidoVentaDet item, csCompany xCompany)
        {
            bool _Rpta;
            string xRpta = "";
            string oQuery = "";
            Recordset recordset;

            string[] tipos = { "U", "S" };

            try
            {
                double tipoCambio = 0;
                xRpta = Connect(xCompany);

                oQuery = $"SELECT \"Rate\" FROM ORTT WHERE \"RateDate\" = '{pedido.FecContabilizacion.ToString("yyyyMMdd")}' AND \"Currency\" = 'USD'";
                recordset = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                recordset.DoQuery(oQuery);
                tipoCambio = recordset.RecordCount > 0 ? recordset.Fields.Item(0).Value : tipoCambio;

                string xUnd = "";
                double xCant = 0;
                oQuery = $"SELECT T3.\"BaseQty\", T2.\"UgpCode\" FROM \"OITM\" T1 INNER JOIN \"OUGP\" T2 ON T2.\"UgpEntry\" = T1.\"UgpEntry\" INNER JOIN \"UGP1\" T3 ON T3.\"UgpEntry\" = T2.\"UgpEntry\" WHERE T3.\"UomEntry\" = {item.Unidad} AND T1.\"ItemCode\" = '{item.IdProducto}'";
                recordset = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                recordset.DoQuery(oQuery);

                xUnd = recordset.Fields.Item(1).Value;
                xCant = (double)recordset.Fields.Item(0).Value;

                oQuery = $"INSERT INTO \"@EXP_PROMO_TEMP\" (\"Code\", \"Name\", \"U_EXP_CODOPERACION\", \"U_EXP_CARDCODE\", \"U_EXP_USERCODE\", \"U_EXP_LINEID\", \"U_EXP_ITEMCODE\", \"U_EXP_CANTIDAD\", \"U_EXP_PRECIO\", " +
                         $"\"U_EXP_PROMOCION\", \"U_EXP_TIPO\", \"U_EXP_VALOR\", \"U_EXP_ASIGNAR\", \"U_EXP_IMPUESTO\", \"U_EXP_TOTAL\", \"U_EXP_PORCENT\", \"U_EXP_PRECIO2\", \"U_EXP_LINETOTAL\", \"U_EXP_COLOR\", \"U_EXP_TIPODSCTO\", " +
                         $"\"U_EXP_DOCDATE\", \"U_EXP_TAXDATE\", \"U_EXP_APLICACANT\", \"U_EXP_PORCIMPUESTO\", \"U_EXP_REFERENCIA\", \"U_CurrencyCode\", \"U_CurrencyRate\", \"U_UNIDADID\", \"U_UNIDAD_QTY\") VALUES (SEQ_PROMO_TEMP.NEXTVAL, SEQ_PROMO_TEMP.NEXTVAL, " +
                         /* CODOPERA    OK */ $"'{pedido.CodOperacion}', " +
                         /* CARDCODE    OK */ $"'{pedido.CodCliente}', " +
                         /* USERCODE    OK */ $"'{xCompany.UserSAP}', " +
                         /* LINEID      OK */ $"'{item.LineNum}', " +
                         /* ITEMCODE    OK */ $"'{item.IdProducto}', " +
                         /* CANTIDAD    OK */ $"'{item.Cantidad}', " +
                         /* PRECIO      OK */ $"'{item.PrecioUnit}', " +
                         /* PROMOCION   OK */ $"'{(tipos.Contains(item.U_EXP_CODIGO) ? item.U_EXP_CODIGO : (item.U_EXP_TIPO == string.Empty && item.Descuento > 0) ? "SAP-DSCTO" : string.Empty)}', " +
                         /* TIPO        OK */ $"'{(tipos.Contains(item.U_EXP_TIPO) ? item.U_EXP_TIPO : (item.U_EXP_TIPO == string.Empty && item.Descuento > 0) ? "S" : string.Empty)}', " +
                         /* VALOR       -- */ $"'{(tipos.Contains(item.U_EXP_TIPO) ? item.U_EXP_VALOR : 0)}', " +
                         /* ASIGNAR     -- */ $"'{(tipos.Contains(item.U_EXP_TIPO) ? item.U_EXP_ASIGNAR : 0)}', " +
                         /* IMPUESTO    -- */ $"'0', " +
                         /* TOTAL       -- */ $"'0', " +
                         /* PORCENT     OK */ $"'{(tipos.Contains(item.U_EXP_TIPO) ? item.Descuento : 0)}', " +
                         /* PRECIO2     OK */ $"'{item.PrecioUnit}', " +
                         /* LINETOTAL   -- */ $"'{item.Cantidad * item.PrecioUnit}', " +
                         /* COLOR       -- */ $"'{(tipos.Contains(item.U_EXP_TIPO) ? item.U_EXP_COLOR : "D1DEE")}', " +
                         /* TIPO DSCTO  -- */ $"'', " +
                         /* DOCDATE     OK */ $"'{pedido.FecContabilizacion.ToString("yyyyMMdd")}', " +
                         /* TAXDATE     OK */ $"'{pedido.FecPedido.ToString("yyyyMMdd")}', " +
                         /* APLICACANT  OK */ $"'{(tipos.Equals(item.U_EXP_TIPO) ? item.Cantidad : 0)}', " +
                         /* PORCIMP     OK */ $"'{(18)}', " +
                         /* REFERENCIA  OK */ $"'{(tipos.Equals(item.U_EXP_TIPO) ? item.U_EXP_REFERENCIA : string.Empty)}', " +
                         /* CURR CODE   OK */ $"'{pedido.Moneda}', " +
                         /* CURR RATE   OK */ $"'{tipoCambio}'," +
                         /* U_UNIDADID */     $"'{xUnd}', +" +
                         /* U_UNIDAD_QTY*/    $"{xCant});";
                recordset = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                recordset.DoQuery(oQuery);

                _Rpta = true;
            }
            catch (Exception ex)
            {
                _Rpta = false;
                throw ex;
            }
            finally
            {
                oCompany.Disconnect();
            }

            return _Rpta;
        }

        public string fn_Promociones_Evaluar(string numeroOperacion, string usuario, csCompany xCompany)
        {
            string xRpta;
            try
            {
                string oQuery = "";
                Recordset recordset;
                xRpta = Connect(xCompany);

                if (xRpta == string.Empty)
                {
                    oQuery = $"CALL \"EXP_PROMO_EVALUAR\" ('{numeroOperacion}','{usuario}')";
                    recordset = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                    recordset.DoQuery(oQuery);

                    xRpta = recordset.Fields.Item(1).Value;
                }
            }
            catch (Exception ex)
            
            {
                xRpta = ex.Message;
            }

            return xRpta;
        }
        
        public List<DTOPedidoVentaDet> fn_Promociones_Buscar(string numeroOperacion, csCompany xCompany)
        {
            List<DTOPedidoVentaDet> oListaDet = new List<DTOPedidoVentaDet>();

            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm = new OdbcCommand();
            OdbcDataReader dr = null;

            try
            {
                cm.CommandText = $"CALL \"EXX_TPED_Promociones_Buscar\" ('{numeroOperacion}')";
                cm.CommandType = CommandType.Text;
                cm.Connection = cn;
                cn.Open();
                dr = cm.ExecuteReader();
                while (dr.Read())
                {
                    DTOPedidoVentaDet dtodet = new DTOPedidoVentaDet();
                    /* U_EXP_PORCENT, U_EXP_PRECIO2, , U_EXP_IMPUESTO, U_EXP_TOTAL */
                    dtodet.IdProducto = dr["U_EXP_ITEMCODE"].ToString();
                    dtodet.Cantidad = Convert.ToDouble(dr["U_EXP_CANTIDAD"]);
                    dtodet.PrecioUnit = Convert.ToDouble(dr["U_EXP_PRECIO"]);
                    dtodet.PrecioTotal = Convert.ToDouble(dr["U_EXP_LINETOTAL"]);
                    dtodet.LineNum = Convert.ToInt32(dr["U_EXP_LINEID"]);
                    dtodet.U_EXP_PROMOCION = dr["U_EXP_PROMOCION"].ToString();
                    dtodet.U_EXP_TIPO = dr["U_EXP_TIPO"].ToString();
                    dtodet.U_EXP_VALOR = Convert.ToDouble(dr["U_EXP_VALOR"]);
                    dtodet.U_EXP_ASIGNAR = Convert.ToDouble(dr["U_EXP_ASIGNAR"]);
                    dtodet.U_EXP_COLOR = dr["U_EXP_COLOR"].ToString();
                    dtodet.U_EXP_TIPODSCTO = dr["U_EXP_TIPODSCTO"].ToString();
                    dtodet.U_EXP_APLICACANT = Convert.ToDouble(dr["U_EXP_APLICACANT"]);
                    dtodet.U_EXP_REFERENCIA = dr["U_EXP_REFERENCIA"].ToString();
                    dtodet.U_EXP_CODIGO = numeroOperacion;
                    oListaDet.Add(dtodet);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                cn.Close();
            }

            return oListaDet;
        }

        public List<DTOPedidoVentaDet> fn_Bonificaciones_Buscar(string numeroOperacion, csCompany xCompany)
        {
            List<DTOPedidoVentaDet> oListaDet = new List<DTOPedidoVentaDet>();

            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm = new OdbcCommand();
            OdbcDataReader dr = null;

            try
            {
                cm.CommandText = $"CALL \"EXX_TPED_Bonificaciones_Buscar\" ('{numeroOperacion}')";
                cm.CommandType = CommandType.Text;
                cm.Connection = cn;
                cn.Open();
                dr = cm.ExecuteReader();
                while (dr.Read())
                {
                    DTOPedidoVentaDet dtodet = new DTOPedidoVentaDet();
                    dtodet.IdProducto = dr["U_ITEMCODE"].ToString();
                    dtodet.Descripcion = dr["ItemName"].ToString();
                    dtodet.CodUndMed = Convert.ToInt32(dr["UomEntry"]);
                    dtodet.Cantidad = Convert.ToDouble(dr["U_CANTIDAD"]);
                    dtodet.LineNum = Convert.ToInt32(dr["U_LINEID"]);
                    dtodet.U_EXP_PROMOCION = dr["U_PROMOCION"].ToString();
                    dtodet.U_EXP_COLOR = dr["U_COLOR"].ToString();
                    dtodet.Dimension2 = dr["U_EXK_CENCOSTO"].ToString();
                    dtodet.U_EXP_CODIGO = numeroOperacion;
                    dtodet.U_EXP_VALOR = Convert.ToDouble(dr["U_VALOR"]);
                    dtodet.U_EXP_TIPO = dr["U_TIPO"].ToString();
                    dtodet.PrecioUnit = Convert.ToDouble(dr["Price"]);
                    oListaDet.Add(dtodet);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                cn.Close();
            }

            return oListaDet;
        }
        
        public List<DTOPromocion> fn_BoniSugeridad_Buscar(string numeroOperacion, string usuario, csCompany xCompany)
        {
            List<DTOPromocion> oLista = new List<DTOPromocion>();

            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm = new OdbcCommand();
            OdbcDataReader dr = null;

            try
            {
                //cm.CommandText = $"CALL \"EXX_TPED_PromoSugeridas_Buscar\" ('{codProducto}')";
                cm.CommandText = $"CALL \"EXP_PROMO_SUGERENCIAS\" ('{numeroOperacion}', '{usuario}')";
                cm.CommandType = CommandType.Text;
                cm.Connection = cn;
                cn.Open();
                dr = cm.ExecuteReader();
                while (dr.Read())
                {
                    DTOPromocion dto = new DTOPromocion();
                    dto.Tipo = dr["Tipo"].ToString();
                    dto.Nombre = dr["Promoción"].ToString();
                    dto.Code = dr["PromoID"].ToString(); 
                    oLista.Add(dto);
                }
                dr.Close();

                foreach(DTOPromocion item in oLista)
                {
                    OdbcCommand cm1 = new OdbcCommand();
                    OdbcDataReader dr1 = null;

                    List<DTOPromocionDet> oListaDetAux = new List<DTOPromocionDet>();

                    cm1.CommandText = $"CALL \"EXX_TPED_PromoSugerida_Buscar\" ('{item.Code}')";
                    cm1.CommandType = CommandType.Text;
                    cm1.Connection = cn;

                    dr1 = cm1.ExecuteReader();
                    while (dr1.Read())
                    {
                        DTOPromocionDet dto = new DTOPromocionDet();
                        dto.CodProducto = dr1["U_EXP_VALOR"].ToString();
                        dto.NomProduto = dr1["U_EXP_DESCRIPCION"].ToString();
                        dto.Cantidad = Convert.ToDouble(dr1["U_EXP_CANTIDAD"]);
                        dto.TipoDescuento = dr1["U_EXP_TIPODSCTO"].ToString();
                        dto.Valor = Convert.ToDouble(dr1["Valor"]);
                        dto.Order = Convert.ToInt32(dr1["Order"]);
                        oListaDetAux.Add(dto);
                    }
                    dr1.Close();

                    List<DTOPromocionDet> aux1 = oListaDetAux.Where(t=>t.Order == 1).ToList();
                    List<DTOPromocionDet> aux2 = oListaDetAux.Where(t=>t.Order == 2).ToList();
                    List<DTOPromocionDet> oListaDet = new List<DTOPromocionDet>();

                    if(aux1.Count > 0)
                    {
                        DTOPromocionDet dto = new DTOPromocionDet();
                        dto.NomProduto = "Configuración";
                        oListaDet.Add(dto);
                        oListaDet.AddRange(aux1);
                    }

                    if (aux2.Count > 0)
                    {
                        DTOPromocionDet dto = new DTOPromocionDet();
                        oListaDet.Add(dto);

                        dto = new DTOPromocionDet();
                        dto.NomProduto = "Descuento";
                        oListaDet.Add(dto);
                        oListaDet.AddRange(aux2);
                    }

                    item.ListaPromocion = oListaDet;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                cn.Close();
            }

            return oLista;
        }

        public bool fn_TempPromoConta_Registrar(DTOPedidoVentaCab pedido, csCompany xCompany)
        {
            bool _Rpta;
            string xRpta = "";
            string oQuery = "";
            Recordset recordset;

            try
            {
                int xCodCondPago = 0;

                xRpta = Connect(xCompany);

                oQuery = $"SELECT \"GroupNum\" FROM OCTG WHERE \"PymntGroup\" = '{pedido.CondPago}'";
                recordset = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                recordset.DoQuery(oQuery);
                xCodCondPago = recordset.Fields.Item(0).Value;

                oQuery = $"INSERT INTO \"@EXP_FPAGO_TEMP\" (\"Code\", \"Name\", \"U_EXP_CODOPERACION\", \"U_EXP_CARDCODE\", \"U_EXP_USERCODE\", \"U_EXP_FPAGO\", \"U_EXP_BANCO_CODE\", \"U_EXP_BANCO_NAME\", \"U_EXP_EVALUAR\", \"U_EXP_LINEID\") " +
                         $"VALUES (SEQ_FPAGO_TEMP.NEXTVAL, SEQ_FPAGO_TEMP.NEXTVAL, '{pedido.CodOperacion}', '{pedido.CodCliente}', '{xCompany.UserSAP}', 'FPG', '{xCodCondPago}','{xCodCondPago}', 'Y', -1);";
                recordset = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);
                recordset.DoQuery(oQuery);

                _Rpta = true;
            }
            catch (Exception ex)
            {
                _Rpta = false;
                throw ex;
            }
            finally
            {
                oCompany.Disconnect();
            }

            return _Rpta;
        }

        #endregion

        private string Connect(csCompany xCompany)
        {
            string _Error = "";

            try
            {
                oCompany = new ConexionSAP().LoginSAP(xCompany);
                if (oCompany != null)
                    _Error = "";
            }
            catch (Exception ex)
            {
                _Error = ex.Message;
            }

            return _Error;
        }

    }
}
