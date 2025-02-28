SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista los proyectos
-- =============================================
CREATE PROCEDURE [EXX_Proyectos_Listar]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT  "PrjCode",
			"PrjCode" + ' - ' + "PrjName" AS "PrjName"
	FROM OPRJ
	WHERE "Active" = 'Y'

END
GO
