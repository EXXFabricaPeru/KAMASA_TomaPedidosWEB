SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Lista de Provincias
-- =============================================
CREATE PROCEDURE [EXX_Provincia_Listar]
	-- Add the parameters for the stored procedure here
	--@P_CodPais varchar(5),
	@P_CodDepa varchar(5)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT "Code", "Name", *
	FROM "@EXX_PROVIN"
	WHERE "U_EXX_CODPAI" = 'PE'--@P_CodPais
	  AND "U_EXX_CODDEP" = @P_CodDepa
END
GO
