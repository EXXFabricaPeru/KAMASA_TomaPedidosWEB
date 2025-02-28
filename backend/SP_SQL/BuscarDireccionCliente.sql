SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Busca Direccion del Cliente
-- =============================================
CREATE PROCEDURE [EXX_DireccionCliente_Buscar] -- [EXX_DireccionCliente_Buscar] 'C10123456789'
	-- Add the parameters for the stored procedure here
	@P_CardCode varchar(12)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	"Address",
			"Street",
			"ZipCode",
			"County",
			"State",
			"AdresType",
			"LineNum"
	FROM CRD1
	WHERE "CardCode" = @P_CardCode
	ORDER BY "LineNum"
END
GO
