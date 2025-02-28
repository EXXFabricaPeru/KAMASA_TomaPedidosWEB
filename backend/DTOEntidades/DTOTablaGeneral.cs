using System.Runtime.Serialization;

namespace DTOEntidades
{
    [DataContract]
    public class DTOTablaGeneral
    {
        [DataMember(Order = 0)]
        public string Codigo { get; set; }

        [DataMember(Order = 1)]
        public string Descripcion { get; set; }

        [DataMember(Order = 2)]
        public string Valor01 { get; set; }
    }
}
