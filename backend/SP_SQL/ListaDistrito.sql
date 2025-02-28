
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Lista de distrito
-- =============================================
CREATE PROCEDURE [EXX_Distrito_Listar]
	-- Add the parameters for the stored procedure here
	@P_Provincia varchar(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @xCodProv varchar(5)

	SELECT @xCodProv = "Code"
	FROM "@EXX_PROVIN"
	WHERE "Name" = @P_Provincia

    -- Insert statements for procedure here
	SELECT "Code", "U_EXX_DESDIS"
	FROM [@EXX_DISTRI]
	WHERE U_EXX_CODPRO = @xCodProv
	ORDER BY NAME
END
GO
