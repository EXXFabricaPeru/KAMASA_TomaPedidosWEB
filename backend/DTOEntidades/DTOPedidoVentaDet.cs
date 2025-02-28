using System.Runtime.Serialization;

namespace DTOEntidades
{
    [DataContract]
    public class DTOPedidoVentaDet
    {
        [DataMember]
        public string IdProducto { get; set; }

        [DataMember]
        public string Descripcion { get; set; }

        [DataMember]
        public double Cantidad { get; set; }
        
        [DataMember]
        public double Descuento { get; set; }

        [DataMember]
        public string Unidad { get; set; }

        [DataMember]
        public double  PrecioUnit { get; set; }
        
        [DataMember]
        public double  PrecioBruto { get; set; }

        [DataMember]
        public double  PrecioTotal { get; set; }

        [DataMember]
        public string TipoImpuesto { get; set; }

        [DataMember]
        public string CodAlmacen { get; set; }
        
        [DataMember]
        public string Dimension1 { get; set; }
        
        [DataMember]
        public string Dimension2 { get; set; }
        
        [DataMember]
        public string Dimension3 { get; set; }
        
        [DataMember ]
        public string Dimension4 { get; set; }
        
        [DataMember]
        public string Dimension5 { get; set; }
        
        [DataMember]
        public string Proyecto { get; set; }

        [DataMember]
        public int CodUndMed { get; set; }

        [DataMember]
        public int LineNum { get; set; }

        //Promociones
        [DataMember]
        public string U_EXP_CODIGO { get; set; }
        [DataMember]
        public string U_EXP_PROMOCION { get; set; }
        [DataMember]
        public string U_EXP_TIPO { get; set; }
        [DataMember]
        public double U_EXP_VALOR { get; set; }
        [DataMember]
        public double U_EXP_ASIGNAR { get; set; }
        [DataMember]
        public double U_EXP_APLICACANT { get; set; }
        [DataMember]
        public string U_EXP_COLOR { get; set; }
        [DataMember]
        public string U_EXP_TIPODSCTO { get; set; }
        [DataMember]
        public string U_EXP_REFERENCIA { get; set; }
        [DataMember]
        public bool IsBonificacion { get; set; }

    }
}
