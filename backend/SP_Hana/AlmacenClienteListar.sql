-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista los almacenes del cliente
-- CALL "EXX_TPED_AlmacenCliente_Listar" ('CCC')
-- =============================================
CREATE PROCEDURE "EXX_TPED_AlmacenCliente_Listar" 
(
	IN P_Codigo nvarchar(15)
)
LANGUAGE SQLSCRIPT AS
BEGIN
	
    -- Insert statements for procedure here
	SELECT "Address", "Street"
	FROM "CRD1" 
	WHERE "CardCode" = :P_Codigo
	  AND "AdresType" = 'S';
END;
