SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista SubDimenciones
-- =============================================
CREATE PROCEDURE [EXX_SubDimenciones_Listar] -- [EXX_SubDimenciones_Listar] 3
	-- Add the parameters for the stored procedure here
	@P_Dimencion int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	"PrcCode",
			"PrcName"
	FROM OPRC
	WHERE "Locked" = 'N'
	  AND "DimCode" = @P_Dimencion
	ORDER BY "PrcName"
END
GO
