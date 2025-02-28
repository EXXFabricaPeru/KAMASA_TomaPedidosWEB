CREATE PROCEDURE "EXX_TPED_Cliente_Buscar"
(
	IN P_CodCliente varchar(12)
)
LANGUAGE SQLSCRIPT AS
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Busca Cliente
-- =============================================
BEGIN

	SELECT	"CardCode",
			"CardName",
			"CardFName",
			"LicTradNum",
			"Currency",
			"GroupCode",
			"IndustryC",
			U_EXX_APELLPAT,
			U_EXX_APELLMAT,
			U_EXX_PRIMERNO,
			U_EXX_SEGUNDNO,
			U_EXX_TIPODOCU,
			U_EXX_TIPOPERS,
			"U_EXK_NMCONDPG",
			"U_EXK_AUTCRED",
			"U_EXK_AUTSOB",
			"U_EXK_CDPAGAUT",
			"U_EXK_CONDPAGO",
			"U_EXK_IMPCRED",
			"U_EXK_MNDCRED",
			"U_EXK_NCCONDPAG",
			"U_EXK_NCRESOB",
			"U_EXK_NOTCRED",
			"U_EXK_PORSOB",
			"U_EXK_SCCONPAG",
			"U_EXK_SOLCRED",
			"U_EXK_SOLSOB"
	FROM OCRD 
	WHERE "CardCode" = :P_CodCliente;
END
