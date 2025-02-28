SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Busca Cliente
-- =============================================
CREATE PROCEDURE [EXX_Cliente_Buscar]
	-- Add the parameters for the stored procedure here
	@P_CodCliente varchar(12)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	"CardCode",
			"CardName",
			"CardFName",
			"LicTradNum",
			U_EXX_APELLPAT,
			U_EXX_APELLMAT,
			U_EXX_PRIMERNO,
			U_EXX_SEGUNDNO,
			U_EXX_TIPODOCU,
			U_EXX_TIPOPERS
	FROM OCRD 
	WHERE "CardCode" = @P_CodCliente
END
GO
