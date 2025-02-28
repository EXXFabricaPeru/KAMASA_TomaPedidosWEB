SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista Tipo Operación
-- =============================================
ALTER PROCEDURE [EXX_TipoOperacion_listar]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	"Code",
			"Code" + ' - ' + "Name" AS "Name"
	FROM "@EXX_TIPOOPER"
END
GO
