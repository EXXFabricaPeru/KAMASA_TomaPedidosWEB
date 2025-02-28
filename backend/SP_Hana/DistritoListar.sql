-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Lista de distrito
-- =============================================
CREATE PROCEDURE "EXX_TPED_Distrito_Listar"
(
	IN P_Provincia varchar(100)
)
AS
BEGIN
	
	DECLARE xCodProv varchar(5);

	SELECT "Code" INTO xCodProv
	FROM "@EXX_PROVIN"
	WHERE "Name" = :P_Provincia;

	SELECT "Code", "U_EXX_DESDIS"
	FROM "@EXX_DISTRI"
	WHERE U_EXX_CODPRO = :xCodProv
	ORDER BY U_EXX_DESDIS;
END
