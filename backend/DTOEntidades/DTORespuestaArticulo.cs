﻿using System.Collections.Generic;
using System.Runtime.Serialization;

namespace DTOEntidades
{
    [DataContract]
    public class DTORespuestaArticulo
    {
        [DataMember(Order = 0 )]
        public string Estado { get; set; }

        [DataMember(Order = 1)]
        public string Mensaje { get; set; }

        [DataMember(Order = 2)]
        public List<DTOArticulo> ListaArticulo { get; set; }
    }
}
