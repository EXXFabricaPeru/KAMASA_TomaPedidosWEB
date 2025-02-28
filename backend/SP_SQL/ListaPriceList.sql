SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 29/09/2023
-- Description:	Lista la lista de precios
-- =============================================
CREATE PROCEDURE [EXX_TPED_ListaPrecio_Listar]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	ListNum,
			ListName
	FROM OPLN
	ORDER BY ListNum
END
GO
