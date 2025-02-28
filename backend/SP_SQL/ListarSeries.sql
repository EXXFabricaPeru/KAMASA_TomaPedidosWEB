SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista serie documento
-- =============================================
CREATE PROCEDURE [EXX_SerieDocumento_Listar] -- [EXX_SerieDocumento_Listar] 2
	-- Add the parameters for the stored procedure here
	@P_Tipo int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	"Series", 
			"SeriesName"
	FROM NNM1
	WHERE "ObjectCode" = '17' 
	  AND @P_Tipo = 2
	  AND "Locked" = 'N'

	UNION ALL

	SELECT	"Series", 
			"SeriesName"
	FROM NNM1
	WHERE "ObjectCode" = '23' 
	  AND @P_Tipo = 1
	  AND "Locked" = 'N'
END
GO
