CREATE PROCEDURE "EXX_TPED_Configuracion"
	-- Add the parameters for the stored procedure here	
AS
BEGIN
	
	SELECT	"Code",
			"U_EXX_CAMPO" "Campo",
			"U_EXX_FORMULARIO" "Formulario",
			"U_EXX_VISIBLE" "Visible",
			"U_EXX_EDITABLE" "Editable"
	FROM "@EXX_TPED_CONFIG";
END