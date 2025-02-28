
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 13/09/2023
-- Description:	Lista Condiciones de PAgo
-- =============================================
CREATE PROCEDURE [EXX_CondicionPago_Listar]
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT "GroupNum" "Codigo", "PymntGroup" "Descripcion"
	FROM OCTG
END
GO
