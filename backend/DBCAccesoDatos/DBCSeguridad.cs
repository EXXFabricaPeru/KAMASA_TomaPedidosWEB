using DTOEntidades;
using SAPbobsCOM;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Odbc;
using System.Net.PeerToPeer.Collaboration;
using System.Security.Claims;
using System.Xml;

namespace DBCAccesoDatos
{
    public interface IDBCSeguridad
    {
        DTORespuestaEmpleado fn_BuscarUsuario(string pUser, string pPassword, csCompany xCompany);
        DTORespuestaEmpleado fn_Usuario_Buscar(string pCodigo, csCompany xCompany);
        DTORespuestaEmpleado fn_ListarUsuario(string pValor, csCompany xCompany);
        DTORespuestaEmpleado fn_GuardarEmpleado(DTOEmpleado empleado, csCompany xCompany);
        DTORespuestaEmpleado fn_ActualizarEmpleado(DTOEmpleado empleado, csCompany xCompany);
        DTORespuestaEmpleado fn_InactivarEmpleado(DTOEmpleado empleado, csCompany xCompany);
    }

    public class DBCSeguridad : IDBCSeguridad
    {
        Company oCompany;

        public DTORespuestaEmpleado fn_BuscarUsuario(string pUser, string pPassword, csCompany xCompany)
        {
            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm= new OdbcCommand();
           
            OdbcDataReader dr = null;

            DTORespuestaEmpleado dto = new DTORespuestaEmpleado();
            List<DTOEmpleado> oListaEmp = new List<DTOEmpleado>();
            DTOEmpleado dtoEmp = null;

            try
            {
                string clave = Encryptor.Rijndael.Encriptar(pPassword);
                cm.CommandType = CommandType.Text;
                cm.CommandText = $"CALL EXX_TPED_LOGINTOMAPEDIDO ('{pUser}','{clave}')";
                cm.Connection = cn;
                cn.Open();

                dr = cm.ExecuteReader();
                while (dr.Read())
                {
                    dtoEmp = new DTOEmpleado();
                    dtoEmp.IdEmpleado = dr["DocEntry"].ToString();
                    dtoEmp.Usuario = dr["Usuario"].ToString();
                    dtoEmp.NombreEmpleado = dr["Nombre"].ToString();
                    dtoEmp.CodVendedor = dr["CodVendedor"].ToString() == "" ? 0 : Convert.ToInt32(dr["CodVendedor"]);
                    dtoEmp.ListaPrecio = dr["ListaPrecio"].ToString();
                    dtoEmp.Moneda = dr["Moneda"].ToString();
                    dtoEmp.Sucursal = Convert.ToInt32(dr["Sucursal"]);
                    dtoEmp.ListaPrecioBruto = dr["IsGrossPrc"].ToString() == "Y" ? true : false;
                    dtoEmp.DiasVencim = dr["DiasVenc"].ToString();
                }
                dr.Close();

                if (dtoEmp != null)
                {
                    dtoEmp.Configuracion = fn_ConfiguracionBuscar(cn);

                    oListaEmp.Add(dtoEmp);
                    dto.Estado = "True";
                    dto.Mensaje = "Inicio de sesión correctamente";                
                    dto.ListaEmpleado = oListaEmp;
                }
                else
                {
                    dto.Estado = "False";
                    dto.Mensaje = "Usuario o clave incorrectos";
                    dto.ListaEmpleado = null;
                }

            }
            catch (Exception ex)
            {
                dto.Estado = "False";
                dto.Mensaje = "Se produjo un error:" + ex.Message;
                dto.ListaEmpleado = null;
            }
            finally
            {
                cn.Close();
            }

            return dto;
        }
        
        public DTORespuestaEmpleado fn_Usuario_Buscar(string pCodigo, csCompany xCompany)
        {
            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm= new OdbcCommand();
           
            OdbcDataReader dr = null;

            DTORespuestaEmpleado dto = new DTORespuestaEmpleado();
            List<DTOEmpleado> oListaEmp = new List<DTOEmpleado>();
            DTOEmpleado dtoEmp = null;

            try
            {
                cm.CommandType = CommandType.Text;
                cm.CommandText = $"CALL \"EXX_TPED_Usuario_Buscar\" ('{pCodigo}')";
                cm.Connection = cn;
                cn.Open();

                dr = cm.ExecuteReader();
                while (dr.Read())
                {
                    dtoEmp = new DTOEmpleado();
                    dtoEmp.IdEmpleado = dr["Code"].ToString();
                    dtoEmp.Usuario = dr["Usuario"].ToString();
                    dtoEmp.NombreEmpleado = dr["Nombre"].ToString();
                    dtoEmp.CodVendedor = dr["CodVendedor"].ToString() == "" ? 0 : Convert.ToInt32(dr["CodVendedor"]);
                    dtoEmp.ListaPrecio = dr["ListaPrecio"].ToString();
                    dtoEmp.Moneda = dr["Moneda"].ToString();
                    dtoEmp.Sucursal = Convert.ToInt32(dr["Sucursal"]);
                    dtoEmp.Contrasenia = Encryptor.Rijndael.Desencriptar(dr["U_EXX_PASS"].ToString());
                    oListaEmp.Add(dtoEmp);
                }
                dr.Close();

                if (oListaEmp.Count > 0)
                {
                    dto.Estado = "True";
                    dto.Mensaje = "Inicio de sesión correctamente";                
                    dto.ListaEmpleado = oListaEmp;
                }
                else
                {
                    dto.Estado = "False";
                    dto.Mensaje = "Usuario o clave incorrectos";
                    dto.ListaEmpleado = null;
                }

            }
            catch (Exception ex)
            {
                dto.Estado = "False";
                dto.Mensaje = "Se produjo un error:" + ex.Message;
                dto.ListaEmpleado = null;
            }
            finally
            {
                cn.Close();
            }

            return dto;
        }
        
        public DTORespuestaEmpleado fn_ListarUsuario(string pValor, csCompany xCompany)
        {
            OdbcConnection cn = new OdbcConnection(new ConexionSAP().ConnexionHana(xCompany));
            OdbcCommand cm= new OdbcCommand();
            DTORespuestaEmpleado dto = new DTORespuestaEmpleado();
            List<DTOEmpleado> oListaEmp = new List<DTOEmpleado>();
            try
            {
                pValor = pValor == null ? "" : pValor;
                cm.CommandType = CommandType.Text;
                cm.CommandText = $"CALL \"EXX_TPED_Usuario_Listar\" ('{pValor.ToUpper()}')";
                cm.Connection = cn;
                cn.Open();

                OdbcDataReader dr = cm.ExecuteReader();
                while (dr.Read())
                {
                    DTOEmpleado dtoEmp = new DTOEmpleado();
                    dtoEmp.IdEmpleado = dr["DocEntry"].ToString();
                    dtoEmp.Usuario = dr["Usuario"].ToString();
                    dtoEmp.NombreEmpleado = dr["Nombre"].ToString();
                    dtoEmp.CodVendedor = dr["CodVendedor"].ToString() == "" ? 0 : Convert.ToInt32(dr["CodVendedor"]);
                    dtoEmp.ListaPrecio = dr["ListaPrecio"].ToString();
                    dtoEmp.Moneda = dr["Moneda"].ToString();
                    dtoEmp.Activo = dr["Estado"].ToString();
                    oListaEmp.Add(dtoEmp);
                }
                dr.Close();

                if (oListaEmp.Count > 0)
                {
                    dto.Estado = "True";
                    dto.Mensaje = "Inicio de sesión correctamente";                
                    dto.ListaEmpleado = oListaEmp;
                }
                else
                {
                    dto.Estado = "False";
                    dto.Mensaje = "Usuario o clave incorrectos";
                    dto.ListaEmpleado = null;
                }

            }
            catch (Exception ex)
            {
                dto.Estado = "False";
                dto.Mensaje = "Se produjo un error:" + ex.Message;
                dto.ListaEmpleado = null;
            }
            finally
            {
                cn.Close();
            }

            return dto;
        }

        public DTORespuestaEmpleado fn_GuardarEmpleado(DTOEmpleado empleado, csCompany xCompany)
        {
            DTORespuestaEmpleado dto = new DTORespuestaEmpleado();
            try
            {
                string xRpt = Connect(xCompany);

                if (xRpt == "")
                {
                    string xQuery;
                    Recordset oRs = oCompany.GetBusinessObject(BoObjectTypes.BoRecordset);

                    //Validar si existe el usuario
                    xQuery = $"SELECT COUNT(*) FROM \"@EXX_TPED_USERPED\" WHERE U_EXX_USER = '{empleado.Usuario}' OR U_EXX_VENDEDOR = '{empleado.CodVendedor}'";
                    oRs.DoQuery(xQuery);
                    if(oRs.Fields.Item(0).Value > 0)
                    {
                        dto.Estado = "False";
                        dto.Mensaje = "El usuario o vendedor ya existe";
                        dto.ListaEmpleado = null;
                        return dto;
                    }

                    //Obtener Code
                    xQuery = "SELECT COUNT(*) FROM \"@EXX_TPED_USERPED\" ";
                    oRs.DoQuery(xQuery);
                    int xCantidad = oRs.Fields.Item(0).Value;

                    string clave = Encryptor.Rijndael.Encriptar(empleado.Contrasenia);
                    CompanyService oCompanyService = oCompany.GetCompanyService();
                    // Get GeneralService (oCmpSrv is the CompanyService)
                    GeneralService oGeneralService = oCompanyService.GetGeneralService("EXX_TPED_USERPED");
                    // Create data for new row in main UDO
                    GeneralData oGeneralData = ((GeneralData)oGeneralService.GetDataInterface(GeneralServiceDataInterfaces.gsGeneralData));
                    oGeneralData.SetProperty("Code", xCantidad.ToString());
                    oGeneralData.SetProperty("U_EXX_USER", empleado.Usuario);
                    oGeneralData.SetProperty("U_EXX_PASS", clave);
                    oGeneralData.SetProperty("U_EXX_VENDEDOR", empleado.CodVendedor);
                    oGeneralData.SetProperty("U_EXX_PRICELIST", empleado.ListaPrecio);
                    oGeneralData.SetProperty("U_EXX_MONEDA", empleado.Moneda);
                    oGeneralData.SetProperty("U_EXX_SUCURSAL", empleado.Sucursal);
                    oGeneralData.SetProperty("U_EXX_ACTIVO", "Y");

                    // Add the new row, including children, to database
                    GeneralDataParams oGeneralParams = oGeneralService.Add(oGeneralData);
                    xRpt = "Se registo con éxito";
                    dto.Estado = "True";
                    dto.Mensaje = xRpt;
                }
                else
                {
                    dto.Estado = "False";
                    dto.Mensaje = xRpt;
                    dto.ListaEmpleado = null;
                }
            }
            catch(Exception ex)
            {
                dto.Estado = "False";
                dto.Mensaje = ex.Message;
                dto.ListaEmpleado = null;
            }
            return dto;
        }
        
        public DTORespuestaEmpleado fn_ActualizarEmpleado(DTOEmpleado empleado, csCompany xCompany)
        {
            DTORespuestaEmpleado dto = new DTORespuestaEmpleado();
            
            try
            {
                string xRpt = Connect(xCompany);

                if (xRpt == "")
                {
                    string clave = Encryptor.Rijndael.Encriptar(empleado.Contrasenia);
                    CompanyService sCmp = oCompany.GetCompanyService();
                    // Get a handle to the EXX_TPED_USERPED UDO
                    GeneralService oGeneralService = sCmp.GetGeneralService("EXX_TPED_USERPED");
                    // Get UDO record
                    GeneralDataParams oGeneralParams = (GeneralDataParams)oGeneralService.GetDataInterface(GeneralServiceDataInterfaces.gsGeneralDataParams);
                    oGeneralParams.SetProperty("Code", empleado.IdEmpleado);
                    GeneralData oGeneralData = oGeneralService.GetByParams(oGeneralParams);
                    // Update UDO record
                    oGeneralData.SetProperty("U_EXX_USER", empleado.Usuario);
                    if(empleado.Contrasenia.Trim() != string.Empty)oGeneralData.SetProperty("U_EXX_PASS", clave);
                    oGeneralData.SetProperty("U_EXX_VENDEDOR", empleado.CodVendedor);
                    oGeneralData.SetProperty("U_EXX_PRICELIST", Convert.ToInt32(empleado.ListaPrecio));
                    oGeneralData.SetProperty("U_EXX_MONEDA", empleado.Moneda);
                    oGeneralData.SetProperty("U_EXX_SUCURSAL", Convert.ToInt32(empleado.Sucursal));
                    oGeneralData.SetProperty("U_EXX_ACTIVO", empleado.Activo);

                    // Add the new row, including children, to database
                    oGeneralService.Update(oGeneralData);

                    dto.Estado = "True";
                    dto.Mensaje = "Se actualizó con éxito";
                    dto.ListaEmpleado = null;
                }
                else
                {
                    dto.Estado = "False";
                    dto.Mensaje = xRpt;
                    dto.ListaEmpleado = null;
                }
            }
            catch(Exception ex)
            {
                dto.Estado = "False";
                dto.Mensaje = ex.Message;
                dto.ListaEmpleado = null;
            }
            return dto;
        }
        
        public DTORespuestaEmpleado fn_InactivarEmpleado(DTOEmpleado empleado, csCompany xCompany)
        {
            DTORespuestaEmpleado dto = new DTORespuestaEmpleado();
            
            try
            {
                string xRpt = Connect(xCompany);

                if (xRpt == "")
                {
                    string clave = Encryptor.Rijndael.Encriptar(empleado.Contrasenia);
                    CompanyService sCmp = oCompany.GetCompanyService();
                    // Get a handle to the EXX_TPED_USERPED UDO
                    GeneralService oGeneralService = sCmp.GetGeneralService("EXX_TPED_USERPED");
                    // Get UDO record
                    GeneralDataParams oGeneralParams = (GeneralDataParams)oGeneralService.GetDataInterface(GeneralServiceDataInterfaces.gsGeneralDataParams);
                    oGeneralParams.SetProperty("DocEntry", empleado.IdEmpleado);
                    GeneralData oGeneralData = oGeneralService.GetByParams(oGeneralParams);
                    // Update UDO record
                    oGeneralData.SetProperty("U_EXX_ACTIVO", empleado.Activo);

                    // Add the new row, including children, to database
                    oGeneralService.Update(oGeneralData);
                }
                else
                {
                    dto.Estado = "False";
                    dto.Mensaje = xRpt;
                    dto.ListaEmpleado = null;
                }
            }
            catch(Exception ex)
            {
                dto.Estado = "False";
                dto.Mensaje = ex.Message;
                dto.ListaEmpleado = null;
            }
            return dto;
        }

        List<DTOConfiguracion> fn_ConfiguracionBuscar(OdbcConnection cn)
        {
            OdbcCommand cm = new OdbcCommand();

            OdbcDataReader dr = null;

            DTOConfiguracion dto = null;
            List<DTOConfiguracion> oLista = new List<DTOConfiguracion>();

            try
            {
                cm.CommandType = CommandType.Text;
                cm.CommandText = $"CALL \"EXX_TPED_Configuracion\"";
                cm.Connection = cn;

                dr = cm.ExecuteReader();
                while (dr.Read())
                {
                    dto = new DTOConfiguracion();
                    dto.Code = dr["Code"].ToString();
                    dto.Formulario = dr["Formulario"].ToString();
                    dto.Visible = dr["Visible"].ToString() == "Y" ? true : false;
                    dto.Editable = dr["Editable"].ToString() == "Y" ? true : false;
                    dto.Valor = dr["Valor"].ToString();

                    oLista.Add(dto);
                }
                dr.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return oLista;
        }

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
