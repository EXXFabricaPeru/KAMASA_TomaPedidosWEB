SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista los almacenes del cliente
-- =============================================
ALTER PROCEDURE [EXX_AlmacenCliente_Listar] 
	-- Add the parameters for the stored procedure here
	@P_Codigo varchar(15)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT "Address", "Street"
	FROM "CRD1" 
	WHERE "CardCode" = @P_Codigo
	  AND "AdresType" = 'S'
END
GO
