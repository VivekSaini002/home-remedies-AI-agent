package com.ai.helper;

import java.util.List;

public class Helper {

    public static List<String> getData() {
        return List.of(
                """
                Ailment / Category: Common Cold & Cough
                Remedy Name: Honey, Ginger & Black Pepper Elixir
                Symptoms: Runny nose, tickly throat, chest congestion, persistent dry cough.
                Ingredients: 1 tbsp pure raw honey, 1 tsp freshly grated ginger juice, 1/4 tsp coarsely ground black pepper, 1 pinch turmeric.
                Preparation: Mix the freshly squeezed ginger juice with raw honey, black pepper, and turmeric in a small cup. Warm gently for 10 seconds (do not boil).
                Usage & Dosage: Take 1 teaspoon 2-3 times daily after meals or before sleep to soothe throat irritation.
                Precautions: Do not give raw honey to infants under 1 year of age.
                Keywords: cold, cough, ginger, honey, throat, congestion, flu, fever, runny nose
                """,

                """
                Ailment / Category: Sore Throat & Pharyngitis
                Remedy Name: Warm Salt Water & Turmeric Gargle
                Symptoms: Painful swallowing, inflamed throat, raspiness, swollen tonsils.
                Ingredients: 1 glass warm water (approx. 250ml), 1/2 tsp sea salt or rock salt, 1/4 tsp turmeric powder.
                Preparation: Dissolve salt and turmeric thoroughly in lukewarm water.
                Usage & Dosage: Gargle deeply for 30-60 seconds, 3 to 4 times a day. Spit out after gargling.
                Precautions: Ensure water is comfortable warm, not hot. Do not swallow the gargle solution.
                Keywords: sore throat, throat pain, gargle, salt water, turmeric, inflammation, tonsils
                """,

                """
                Ailment / Category: Digestive Health & Acidity / Heartburn
                Remedy Name: Cumin, Coriander & Fennel (CCF) Tea
                Symptoms: Acid reflux, bloating, stomach heaviness, indigestion, gas.
                Ingredients: 1/2 tsp cumin seeds, 1/2 tsp coriander seeds, 1/2 tsp fennel seeds, 3 cups water.
                Preparation: Boil seeds in 3 cups of water for 5-8 minutes until reduced slightly. Strain seeds.
                Usage & Dosage: Sip warm tea slowly after lunch and dinner.
                Precautions: Safe for daily use. If acidity is accompanied by severe abdominal pain or vomiting blood, seek immediate medical assistance.
                Keywords: acidity, gas, bloating, indigestion, acid reflux, stomach pain, cumin, fennel, digestion
                """,

                """
                Ailment / Category: Headache & Tension Migraine
                Remedy Name: Peppermint Oil Temple Massage & Ginger Tea
                Symptoms: Throbbing headache, forehead pressure, tension around temples and neck.
                Ingredients: 2 drops peppermint essential oil diluted in 1 tsp coconut or almond oil; 1 cup brewed ginger tea.
                Preparation: Dilute peppermint oil in carrier oil. Brew fresh ginger slices in boiling water for 5 minutes.
                Usage & Dosage: Gently massage diluted peppermint oil onto temples and forehead avoiding eyes. Drink warm ginger tea slowly.
                Precautions: Avoid getting essential oil near eyes. Test oil on a small patch of skin first.
                Keywords: headache, migraine, tension, head pain, peppermint oil, ginger tea, stress headache
                """,

                """
                Ailment / Category: Insomnia & Sleep Disorders
                Remedy Name: Warm Nutmeg Golden Milk (Haldi Doodh)
                Symptoms: Difficulty falling asleep, restlessness, anxious thoughts at bedtime.
                Ingredients: 1 cup milk (plant-based like almond or dairy), 1/2 tsp turmeric powder, 1 pinch freshly ground nutmeg, 1/2 tsp honey or jaggery.
                Preparation: Heat milk gently with turmeric and nutmeg for 3-5 minutes. Stir in honey after removing from heat.
                Usage & Dosage: Drink 30 minutes before bedtime while warm.
                Precautions: Do not exceed a pinch of nutmeg as excessive nutmeg can cause drowsiness or stomach distress.
                Keywords: sleep, insomnia, bedtime, golden milk, turmeric, nutmeg, stress relief, relaxation
                """,

                """
                Ailment / Category: Skin Care & Acne / Pimples
                Remedy Name: Neem, Turmeric & Aloe Vera Healing Gel Paste
                Symptoms: Facial acne breakout, red pimples, skin inflammation, oily skin impurities.
                Ingredients: 1 tbsp fresh aloe vera gel, 1/4 tsp organic turmeric, 3-4 crushed neem leaves (or 1/4 tsp neem powder).
                Preparation: Blend crushed neem leaves with aloe vera gel and turmeric into a smooth paste.
                Usage & Dosage: Apply topically onto clean face and pimple spots. Leave for 15 minutes, then rinse with cool water 2-3 times a week.
                Precautions: Turmeric may temporarily stain pale skin yellowish. Avoid open bleeding wounds.
                Keywords: acne, pimples, skin care, glowing skin, aloe vera, neem, turmeric, spots, face mask
                """,

                """
                Ailment / Category: Hair Health & Dandruff
                Remedy Name: Fenugreek (Methi) & Tea Tree Coconut Hair Mask
                Symptoms: Flaky scalp, itchy head, hair thinning, dry scalp irritation.
                Ingredients: 2 tbsp fenugreek seeds (soaked overnight), 2 tbsp warm coconut oil, 3 drops tea tree essential oil.
                Preparation: Grind soaked fenugreek seeds into a fine paste with water. Mix in warm coconut oil and tea tree oil.
                Usage & Dosage: Apply evenly to scalp and hair roots. Leave on for 30 minutes before washing with mild shampoo. Use once weekly.
                Precautions: Rinse thoroughly to remove fenugreek residue.
                Keywords: dandruff, itchy scalp, hair fall, hair care, coconut oil, fenugreek, tea tree oil
                """,

                """
                Ailment / Category: Joint & Muscle Pain / Arthritis
                Remedy Name: Warm Sesame Oil Mustard Seed Compress & Turmeric Tea
                Symptoms: Stiff joints, knee ache, muscle stiffness, swelling after exercise or cold weather.
                Ingredients: 3 tbsp warm sesame oil, 1/2 tsp crushed garlic, 1/2 tsp mustard seeds.
                Preparation: Gently warm sesame oil with crushed garlic and mustard seeds until aromatic. Let cool slightly to a warm temperature.
                Usage & Dosage: Massage gently onto painful joints or sore muscles for 10-15 minutes twice daily. Cover with a warm towel.
                Precautions: Check temperature before applying to prevent burns.
                Keywords: joint pain, arthritis, muscle pain, knee pain, stiffness, sesame oil, massage, soreness
                """,

                """
                Ailment / Category: Nausea & Morning Sickness
                Remedy Name: Lemon Ginger Mint Sparkle
                Symptoms: Queasiness, motion sickness, vomiting sensation, upset stomach.
                Ingredients: 1 inch fresh ginger slice, 5-6 fresh mint leaves, juice of 1/2 fresh lemon, 1 pinch black salt, 1 cup warm or room temp water.
                Preparation: Steep crushed ginger and mint leaves in warm water for 5 minutes. Strain, add lemon juice and black salt.
                Usage & Dosage: Sip slowly in small mouthfuls whenever feeling nauseous.
                Precautions: For pregnancy morning sickness, consult obstetrician before consuming large quantities of herbs.
                Keywords: nausea, vomiting, morning sickness, motion sickness, travel sickness, ginger, lemon, mint
                """,

                """
                Ailment / Category: Toothache & Gum Pain
                Remedy Name: Clove Oil Compression
                Symptoms: Sharp toothache, inflamed gums, throbbing dental pain.
                Ingredients: 1-2 drops pure clove essential oil, 1/2 tsp olive or coconut carrier oil, clean cotton ball.
                Preparation: Dilute clove oil with carrier oil. Soak a small cotton ball in the mixture.
                Usage & Dosage: Place the cotton ball directly on the aching tooth and surrounding gum for 10-15 minutes.
                Precautions: Do not swallow clove oil. Clove oil is strong; always dilute to avoid gum irritation. Visit dentist for persistent dental issues.
                Keywords: toothache, tooth pain, dental pain, clove oil, gum pain, mouth ulcer
                """,

                """
                Ailment / Category: Immunity Boost & General Wellness
                Remedy Name: Herbal Immunity Kadha (Ayurvedic Tea)
                Symptoms: Fatigue, frequent infections, low energy, seasonal illness vulnerability.
                Ingredients: 1 cinnamon stick, 2 cloves, 2 crushed cardamom pods, 4 black peppercorns, 5 tulsi (holy basil) leaves, 1 inch ginger, 1 tsp jaggery or honey.
                Preparation: Crush spices and boil in 3 cups of water for 10 minutes until water reduces by half. Strain and add jaggery or honey.
                Usage & Dosage: Drink 1/2 cup warm kadha every morning during weather changes.
                Precautions: Moderation is key; 1 cup daily is sufficient.
                Keywords: immunity, kadha, herbal tea, wellness, energy, tulsi, cinnamon, cloves, immunity booster
                """,

                """
                Ailment / Category: Constipation & Sluggish Bowels
                Remedy Name: Soak Prunes & Warm Castor / Flaxseed Water
                Symptoms: Hard stools, infrequent bowel movements, abdominal discomfort.
                Ingredients: 4-5 dried prunes or 1 tbsp flaxseeds, 1 glass warm water.
                Preparation: Soak prunes or ground flaxseeds in warm water overnight or for 30 minutes.
                Usage & Dosage: Drink the flaxseed water and eat the soaked prunes early morning on an empty stomach.
                Precautions: Maintain good hydration by drinking plenty of water throughout the day.
                Keywords: constipation, bowel movement, digestion, flaxseed, prunes, fiber, laxative
                """
        );
    }
}