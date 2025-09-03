 const handleRejectionValidation = async (e) => {
        e.preventDefault();
        const button = e.currentTarget;
        button.disabled = true;


        try {
            const postResponse = await fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method: "c_rejet",
                    num_courrier: courrier_numero,
                    rejection: rejection
                })
            });

            // 4. Requête PUT pour mettre à jour le statut
            const putResponse = await fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    num_courrier: courrier_numero,
                    statut: "rejete"
                })
            });

            // Vérification des réponses
            const [postResult, putResult] = await Promise.all([
                postResponse.json(),
                putResponse.json()
            ]);

            if (!postResponse.ok || !putResponse.ok) {
                throw new Error(postResult.error || putResult.error || "Erreur lors du rejet");
            }

            // Succès
            setMessage("Courrier rejeté avec succès");
            alert("Rejet enregistré !");
        }

        catch (error) {
            console.error("Erreur de rejet:", error);
            alert(`Erreur: ${error.message}`);
        }
    };

