SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Lista Contactos Clientes
-- =============================================
CREATE PROCEDURE [EXX_ContactosCliente_Listar] -- [EXX_ContactosCliente_Listar] 'C10123456789'
	-- Add the parameters for the stored procedure here
	@P_CodCliente varchar(12)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	"CardCode",
			"Name",
			"Position",
			"Tel1",
			"E_MailL"
	FROM OCPR
	WHERE "CardCode" = @P_CodCliente
	ORDER BY "CntctCode"
END
GO
