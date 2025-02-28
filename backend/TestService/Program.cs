using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using DTOEntidades;
using System.Runtime.Serialization.Json;

namespace ETNA.TestService
{
    class Program
    {
        static void Main(string[] args)
        {
            //VisitaCliente();
            //MarcaBateria();
            //ClienteBuscar();
            EnviarEstadoCuenta();
            //PedidoVentaDuplicar();
            //BuscarVisita();
            //Login();
            //RegistrarPedido();
            //EstadoCuentaConsultar();
            //ListaPrecio();
            //RegistrarMedicion();
            //BuscarTienda();
            //BuscarDepartamento();
            //ListarClienteCanal();
            //RegitrarMedicionMarca();
            //RegistrarMedicion();
            //RegitrarGeoLocalizacionCliente();
            Console.ReadKey(true);
        }

        private static void VisitaCliente()
        {
            DTOVisitaDet det = new DTOVisitaDet 
            {
                IdVisita = 0,
                IdMotivo = 1,
                UserReg = "Desarrollo1"
            };

            List<DTOVisitaDet> oLista = new List<DTOVisitaDet>();
            oLista.Add(det);

            DTOVisitaCab order = new DTOVisitaCab
            {
                IdVisita = 0,
                CodCliente = "C20112273922",
                CodVendedor = 62,
                Comentario = "India",
                FecVisita = "20150402",
                UserReg = "Desarrollo1",
                ListDetalle = oLista
            };

            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(DTOVisitaCab));
            MemoryStream mem = new MemoryStream();
            ser.WriteObject(mem, order);
            string data = Encoding.UTF8.GetString(mem.ToArray(), 0, (int)mem.Length);
            WebClient webClient = new WebClient();
            webClient.Headers["Content-type"] = "application/json";
            webClient.Encoding = Encoding.UTF8;
            string xUrl = "http://localhost:2104/SrvVentas.svc/EnviarVisita";
            webClient.UploadString(xUrl, "POST", data);
            Console.WriteLine("Order placed successfully...");
        }

        private static void MarcaBateria()
        {
            WebClient proxy = new WebClient();
            string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/MarcaBateria/");
            byte[] data = proxy.DownloadData(serviceURL);
            Stream stream = new MemoryStream(data);
            DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaTablaGeneral));
            DTORespuestaTablaGeneral order = obj.ReadObject(stream) as DTORespuestaTablaGeneral;
            Console.WriteLine("Marca ID : " + order.ListaTablaGeneral[0].Codigo);
            Console.WriteLine("Marca : " + order.ListaTablaGeneral[0].Codigo);
        }

        private static void ClienteBuscar()
        {
            WebClient proxy = new WebClient();
            string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/BuscarCliente/{0},{1},{2}", "a", 62,"19000101");
            byte[] data = proxy.DownloadData(serviceURL);
            Stream stream = new MemoryStream(data);
            DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaTablaGeneral));
            DTORespuestaTablaGeneral order = obj.ReadObject(stream) as DTORespuestaTablaGeneral;
            Console.WriteLine("Marca ID : " + order.ListaTablaGeneral[0].Codigo);
            Console.WriteLine("Marca : " + order.ListaTablaGeneral[0].Codigo);
        }

        private static void EnviarEstadoCuenta()
        {
            WebClient proxy = new WebClient();
            string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/EstadoCuentaEnviar/{0},{1}", "3", "C20600796373");
            byte[] data = proxy.DownloadData(serviceURL);
            Stream stream = new MemoryStream(data);
            DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaTablaGeneral));
            DTORespuestaTablaGeneral order = obj.ReadObject(stream) as DTORespuestaTablaGeneral;
            //Console.WriteLine("Marca ID : " + order.ListaTablaGeneral[0].Codigo);
            //Console.WriteLine("Marca : " + order.ListaTablaGeneral[0].Codigo);
        }

        private static void PedidoVentaDuplicar()
        {
            WebClient proxy = new WebClient();
            //string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/ObtenerDetallePedido/{0}", "1324687");
            string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/ObtenerDetallePedido/{0},{1},{2}",111,"C20479841064",1324687);
            byte[] data = proxy.DownloadData(serviceURL);
            Stream stream = new MemoryStream(data);
            DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaTablaGeneral));
            DTORespuestaTablaGeneral order = obj.ReadObject(stream) as DTORespuestaTablaGeneral;
            Console.WriteLine("Marca ID : " + order.ListaTablaGeneral[0].Codigo);
            Console.WriteLine("Marca : " + order.ListaTablaGeneral[0].Codigo);
        }

        private static void BuscarVisita()
        {
            WebClient proxy = new WebClient();
            string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/BuscarVisita/{0},{1},{2},{3}", 111, "C10156087144","ALMACÉN","0");
            byte[] data = proxy.DownloadData(serviceURL);
            Stream stream = new MemoryStream(data);
            DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaTablaGeneral));
            DTORespuestaTablaGeneral order = obj.ReadObject(stream) as DTORespuestaTablaGeneral;
            Console.WriteLine("Marca ID : " + order.ListaTablaGeneral[0].Codigo);
            Console.WriteLine("Marca : " + order.ListaTablaGeneral[0].Codigo);
        }

        private static void Login()
        {
            WebClient proxy = new WebClient();
            string serviceURL = string.Format("http://localhost:2104/SrvSeguridad.svc/Login/{0},{1}", "aparedes", "kaffu2014.");
            byte[] data = proxy.DownloadData(serviceURL);
            Stream stream = new MemoryStream(data);
            DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaTablaGeneral));
            DTORespuestaTablaGeneral order = obj.ReadObject(stream) as DTORespuestaTablaGeneral;
            Console.WriteLine("Marca ID : " + order.ListaTablaGeneral[0].Codigo);
            Console.WriteLine("Marca : " + order.ListaTablaGeneral[0].Codigo);
        }

        private static void RegistrarPedido()
        {
            string data = "{\"ClienteRecoge\":\"N\",\"CodCliente\":\"C20394077101\",\"CodDireccion\":\"941\",\"CodTransTramo1\":\"1-20100165687\",\"CodVendedor\":\"112\",\"CondPago\":\"24\",\"Cotizacion\":\"S\",\"Descuento\":\"0\",\"DirTransTramo1\":\"AV. EL PACIFICO 501-561-INDEPENDENCIA\",\"Direccion\":\"941 CD ORIENTE CALLAO PROV. DEL CALLAO\",\"FecDespacho\":\"19900101\",\"FecFacturacion\":\"19900101\",\"FecPedido\":\"20160905\",\"FecSolicitado\":\"20160912\",\"ImporteTotal\":\"1875.3857971191405\",\"Version\":\"1.0\",\"ListaDetalle\":[{\"Descripcion\":\"BAT.S-1223/N150 12VC PLO.UNI.ASA\",\"UnidadMed\":\"UND\",\"IdProducto\":10000209,\"Stock\":0,\"Cantidad\":1,\"PrecioUnit\":510.63,\"_precioPromo\":510.63,\"codigo\":0,\"seleccionado\":true},{\"Descripcion\":\"BAT. S-1213EM PRO 12VC 73AH INV\",\"UnidadMed\":\"UND\",\"IdProducto\":10000212,\"Stock\":18,\"Cantidad\":2,\"PrecioUnit\":187.37,\"_precioPromo\":187.37,\"codigo\":0,\"seleccionado\":true},{\"Descripcion\":\"BAT. S-1219 PRO 12VC 127AH NOR\",\"UnidadMed\":\"UND\",\"IdProducto\":10000218,\"Stock\":234,\"Cantidad\":2,\"PrecioUnit\":351.97,\"_precioPromo\":351.97,\"codigo\":0,\"seleccionado\":true}],\"UserReg\":\"desarrollo1\",\"Moneda\":\"SOL\",\"NomTransTramo1\":\"FAB. NACIONAL DE ACUMULADORES ETNA S.A.\",\"NroOC\":\"\",\"SubTotal\":\"1589.3099975585938\",\"OnLine\":\"S\",\"PrecioTablet\":\"0\",\"RegOffLine\":\"19900101\",\"RucTransTramo1\":\"20100165687\",\"_Sel\":false,\"Longitud\":-77.0427934,\"Latitud\":-12.046374,\"IdPedido\":0,\"NroPedido\":0,\"_id\":0}";
            WebClient webClient = new WebClient();
            webClient.Headers["Content-type"] = "application/json";
            webClient.Encoding = Encoding.UTF8;
            string xUrl = "http://localhost:2104/SrvVentas.svc/PedidoVentaEnviar";
            webClient.UploadString(xUrl, "POST", data);
            Console.WriteLine("Order placed successfully...");
        }

        //private static void EstadoCuentaConsultar()
        //{
        //    WebClient proxy = new WebClient();
        //    string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/ConsultarCuentas/{0},{1},{2}", 114, "C20326570363", "1");
        //    byte[] data = proxy.DownloadData(serviceURL);
        //    Stream stream = new MemoryStream(data);
        //    DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaEstadoCuenta));
        //    DTORespuestaEstadoCuenta order = obj.ReadObject(stream) as DTORespuestaEstadoCuenta;
        //    Console.WriteLine("Marca ID : " + order.ListaEstadoCuenta[0].CodCliente);
        //    Console.WriteLine("Marca : " + order.ListaEstadoCuenta[0].NroDocumento);
        //}

        //private static void ListaPrecio()
        //{
        //    WebClient proxy = new WebClient();
        //    string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/ObtenerListaPrecio/{0},{1},{2},{3}", "C20531513534", 8, "SOL", "20160322");
        //    byte[] data = proxy.DownloadData(serviceURL);
        //    Stream stream = new MemoryStream(data);
        //    DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaEstadoCuenta));
        //    DTORespuestaEstadoCuenta order = obj.ReadObject(stream) as DTORespuestaEstadoCuenta;
        //    Console.WriteLine("Marca ID : " + order.ListaEstadoCuenta[0].CodCliente);
        //    Console.WriteLine("Marca : " + order.ListaEstadoCuenta[0].NroDocumento);
        //}

        //private static void ListaArticulo()
        //{
        //    WebClient proxy = new WebClient();
        //    string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/ObtenerListaArticulo/{0}", 6);
        //    byte[] data = proxy.DownloadData(serviceURL);
        //    Stream stream = new MemoryStream(data);
        //    DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaBateria));
        //    DTORespuestaBateria order = obj.ReadObject(stream) as DTORespuestaBateria;
        //    for (int i = 0; i < order.ListaBateria.Count; i++)
        //    {
        //        Console.WriteLine("Marca ID : " + order.ListaBateria[i].IdProducto.ToString());
        //        Console.WriteLine("Marca : " + order.ListaBateria[i].PrecUnit);
        //    }
        //}

        //private static void BuscarTienda()
        //{
        //    WebClient proxy = new WebClient();
        //    string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/TiendaClienteBuscar/{0},{1}", "ATE", "C20112273922");
        //    byte[] data = proxy.DownloadData(serviceURL);
        //    Stream stream = new MemoryStream(data);
        //    DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaEstadoCuenta));
        //    DTORespuestaCliente order = obj.ReadObject(stream) as DTORespuestaCliente;
        //    Console.WriteLine("Marca ID : " + order.ListaCLiente[0].Direccion);
        //    Console.WriteLine("Marca : " + order.ListaCLiente[0].Canal);
        //}

        private static void RegistrarMedicion()
        {
            string xUrl = "http://localhost:2104/SrvVentas.svc/RegistarMedicion";
            string data = "{\"pr_CodProvincia\":\"0218\",\"pr_Observacion\":\"\",\"pr_MED_bBanner\":false,\"pr_CodCliente\":\"C20100070970\",\"pr_FrentesRack_CP\":0,\"pr_MED_bPromocion\":false,\"pr_IdMedicion\":0,\"pr_MED_nStock_AD\":0,\"pr_Longitud\":\"0.00\",\"pr_MED_cDesc_Otros\":\"\",\"pr_MED_bPack\":false,\"pr_MED_bDescuento\":false,\"pr_MED_bOtros\":false,\"pr_MED_nStock_CP\":0,\"pr_MED_nSKU_CP\":0,\"pr_MED_nSKU_AD\":0,\"pr_MED_bJalavista\":false,\"pr_MED_bViñeta\":false,\"pr_MED_bCartel\":false,\"pr_Tienda\":\"PLAZA VEA NUEVO CHIMBOTE\",\"pr_MED_bActivacion\":false,\"pr_UserSys\":\"\",\"pr_MED_bPorc_Dcto\":false,\"pr_MED_bExhibicion\":false,\"pr_MED_nStock_SS\":0,\"pr_CodDistrito\":\"021809\",\"pr_Latitud\":\"0.00\",\"pr_FrentesRack_SS\":0,\"pr_CodDepartamento\":\"02\",\"pr_MED_nSKU_PL\":0,\"pr_FrentesRack_PRO\":0,\"pr_UserReg\":\"desarrollo1\",\"pr_MED_nStock_PRO\":0,\"pr_MED_nSKU_SS\":0,\"pr_FrentesRack_PL\":0,\"pr_NroSkuCodificados\":0,\"pr_MED_bSticker\":false,\"pr_MED_bMerch\":false,\"pr_MED_nSKU_PRO\":0,\"pr_FrentesRack_AD\":0,\"pr_FrentesRackHorizontal\":0,\"pr_MED_nStock_PL\":0}\"";
            byte[] xData = Encoding.UTF8.GetBytes(data);


            HttpWebRequest webClient = (HttpWebRequest)WebRequest.Create(xUrl);
            webClient.Method = "POST";
            webClient.ContentLength = xData.Length;
            webClient.ContentType = "application/json";

            var reqStream = webClient.GetRequestStream();

            reqStream.Write(xData, 0, xData.Length);

            var Res = (HttpWebResponse)webClient.GetResponse();

            StreamReader reader = new StreamReader(Res.GetResponseStream());

            //DTOGrowthMapping dto = new DTOGrowthMapping
            //{
            //    pr_CodProvincia="01",
            //    pr_CodDepartamento="15",
            //    pr_FrentesRack_PRO=111,
            //    pr_CodCliente="C20109072177",
            //    pr_UserReg="Jhonatan",
            //    pr_Longitud="-8855",
            //    pr_AccionesPDV=false,
            //    pr_MarcajeVinetasCarteles=true,
            //    pr_FrentesRack_PL=333,
            //    pr_Tienda="ALMACÉN",
            //    pr_CodArticulo=123,
            //    pr_UserSys="",
            //    pr_FrentesRack_AD=222,
            //    pr_FrentesRackHorizontal=666,
            //    pr_CodDistrito="01",
            //    pr_Latitud="-11666",
            //};

            //DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(DTOGrowthMapping));
            //MemoryStream mem = new MemoryStream();
            //ser.WriteObject(mem, dto);
            //string data1 = Encoding.UTF8.GetString(mem.ToArray(), 0, (int)mem.Length);
            //string data = "{\"pr_CodProvincia\":\"0218\",\"pr_Observacion\":\"\",\"pr_MED_bBanner\":false,\"pr_CodCliente\":\"C20100070970\",\"pr_FrentesRack_CP\":0,\"pr_MED_bPromocion\":false,\"pr_IdMedicion\":0,\"pr_MED_nStock_AD\":0,\"pr_Longitud\":\"0.00\",\"pr_MED_cDesc_Otros\":\"\",\"pr_MED_bPack\":false,\"pr_MED_bDescuento\":false,\"pr_MED_bOtros\":false,\"pr_MED_nStock_CP\":0,\"pr_MED_nSKU_CP\":0,\"pr_MED_nSKU_AD\":0,\"pr_MED_bJalavista\":false,\"pr_MED_bViñeta\":false,\"pr_MED_bCartel\":false,\"pr_Tienda\":\"PLAZA VEA NUEVO CHIMBOTE\",\"pr_MED_bActivacion\":false,\"pr_UserSys\":\"\",\"pr_MED_bPorc_Dcto\":false,\"pr_MED_bExhibicion\":false,\"pr_MED_nStock_SS\":0,\"pr_CodDistrito\":\"021809\",\"pr_Latitud\":\"0.00\",\"pr_FrentesRack_SS\":0,\"pr_CodDepartamento\":\"02\",\"pr_MED_nSKU_PL\":0,\"pr_FrentesRack_PRO\":0,\"pr_UserReg\":\"desarrollo1\",\"pr_MED_nStock_PRO\":0,\"pr_MED_nSKU_SS\":0,\"pr_FrentesRack_PL\":0,\"pr_CodArticulo\":0,\"pr_MED_bSticker\":false,\"pr_MED_bMerch\":false,\"pr_MED_nSKU_PRO\":0,\"pr_FrentesRack_AD\":0,\"pr_FrentesRackHorizontal\":0,\"pr_MED_nStock_PL\":0}\"";
            //WebClient webClient = new WebClient();
            //webClient.Headers["Content-type"] = "application/json";
            //webClient.Encoding = Encoding.UTF8;
            //string xUrl = "http://localhost:2104/SrvVentas.svc/RegistarMedicion";
            ////string xUrl = "http://extranet.etna.com.pe/EtnaMobilWCFDesa/SrvVentas.svc/RegistarMedicion";
            //webClient.UploadString(xUrl, "POST", data);
            //Console.WriteLine("Order placed successfully...");
        }

        //private static void BuscarDepartamento()
        //{
        //    WebClient proxy = new WebClient();
        //    string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/ListarDepartamentoCliente/{0}", "C20394077101");
        //    byte[] data = proxy.DownloadData(serviceURL);
        //    Stream stream = new MemoryStream(data);
        //    DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaEstadoCuenta));
        //    DTORespuestaCliente order = obj.ReadObject(stream) as DTORespuestaCliente;
        //    Console.WriteLine("Marca ID : " + order.ListaCLiente[0].Direccion);
        //    Console.WriteLine("Marca : " + order.ListaCLiente[0].Canal);
        //}

        private static void ListarClienteCanal()
        {
            WebClient proxy = new WebClient();
            string serviceURL = string.Format("http://localhost:2104/SrvVentas.svc/ListarClienteCanal/{0}", "102");
            byte[] data = proxy.DownloadData(serviceURL);
            Stream stream = new MemoryStream(data);
            DataContractJsonSerializer obj = new DataContractJsonSerializer(typeof(DTORespuestaCliente));
            DTORespuestaCliente order = obj.ReadObject(stream) as DTORespuestaCliente;
            Console.WriteLine("Mensaje : " + order.Mensaje);
            Console.WriteLine("Estado : " + order.Estado);
        }

        private static void RegitrarMedicionMarca()
        {
            string data = "{\"pr_GMP_bExhibicion\":false,\"pr_GMP_nIdMedicion\":104,\"pr_GMP_bDescuento\":false,\"pr_Tipo\":1,\"pr_GMP_nIdMarca\":2,\"pr_GMP_bPromocion\":false,\"pr_GMP_bActivacion\":false}";
            
            WebClient webClient = new WebClient();
            webClient.Headers["Content-type"] = "application/json";
            webClient.Encoding = Encoding.UTF8;
            string xUrl = "http://localhost:2104/SrvVentas.svc/RegistrarGrowthMappingMarca";
            //string xUrl = "http://extranet.etna.com.pe/EtnaMobilWCFDesa/SrvVentas.svc/RegistrarGrowthMappingMarca";
            webClient.UploadString(xUrl, "POST", data);
            Console.WriteLine("Register placed successfully...");
        }

        private static void RegitrarGeoLocalizacionCliente()
        {
            string data = "{\"CodigoCliente\":\"C20479841064\",\"Latitud\":\"-11111111\",\"Longitud\":\"-22222222\",\"UserReg\":\"Jhonatan\",\"Linea\":0}";
            
            WebClient webClient = new WebClient();
            webClient.Headers["Content-type"] = "application/json";
            webClient.Encoding = Encoding.UTF8;
            string xUrl = "http://localhost:2104/SrvVentas.svc/ClienteDireccionActualizar";
            //string xUrl = "http://extranet.etna.com.pe/EtnaMobilWCFDesa/SrvVentas.svc/RegistrarGrowthMappingMarca";
            webClient.UploadString(xUrl, "POST", data);
            Console.WriteLine("Register placed successfully...");            
        }
    }
}
