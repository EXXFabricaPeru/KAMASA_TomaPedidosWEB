-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Lista Contactos Clientes
-- =============================================
CREATE PROCEDURE "EXX_TPED_ContactosCliente_Listar"
(
	IN P_CodCliente varchar(12)
)
LANGUAGE SQLSCRIPT AS
BEGIN
	
	SELECT	"CardCode",
			"Name",
			"Position",
			"Tel1",
			"E_MailL"
	FROM OCPR
	WHERE "CardCode" = :P_CodCliente
	ORDER BY "CntctCode";
END;
